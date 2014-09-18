(function(globals) {
var define, requireModule;

(function() {
  var registry = {}, seen = {};

  define = function(name, deps, callback) {
    registry[name] = { deps: deps, callback: callback };
  };

  requireModule = function(name) {
    if (seen[name]) { return seen[name]; }
    seen[name] = {};

    var mod = registry[name];
    if (!mod) {
      throw new Error("Module '" + name + "' not found.");
    }

    var deps = mod.deps,
        callback = mod.callback,
        reified = [],
        exports;

    for (var i=0, l=deps.length; i<l; i++) {
      if (deps[i] === 'exports') {
        reified.push(exports = {});
      } else {
        reified.push(requireModule(deps[i]));
      }
    }

    var value = callback.apply(this, reified);
    return seen[name] = exports || value;
  };
})();

define("ember-pusher/bindings",
  ["exports"],
  function(__exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var Bindings = Ember.Mixin.create({

      init: function() {
        var target;
        this._super();
        if(!this.PUSHER_SUBSCRIPTIONS) { return; }
        target = this;
        Object.keys(target.PUSHER_SUBSCRIPTIONS).forEach(function (channelName) {
          var events = target.PUSHER_SUBSCRIPTIONS[channelName];
          target.pusher.wire(target, channelName, events);
        });
      },

      willDestroy: function() {
        var target;
        if(!this.PUSHER_SUBSCRIPTIONS) { return; }
        target = this;
        Object.keys(target.PUSHER_SUBSCRIPTIONS).forEach(function (channelName) {
          target.pusher.unwire(target, channelName);
        });
        this._super();
      },

      _pusherEventsId: function() {
        return this.toString();
      }

    });


    __exports__.Bindings = Bindings;
  });
define("ember-pusher/client_events",
  ["exports"],
  function(__exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    var ClientEvents = Ember.Mixin.create({

      // Fire an event programmatically. All Events must unfortunately use
      // the client-<eventname> format for client events (a pusher restriction).
      pusherTrigger: function(channelName, eventName, data) {
        var channel = this.pusher.channelFor(channelName);
        channel.trigger(eventName, data);
      }

    });


    __exports__.ClientEvents = ClientEvents;
  });
define("ember-pusher/controller",
  ["exports"],
  function(__exports__) {
    "use strict";
    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember;

    // Need to track
    // 1) channel object
    // 2) event bindings which consist of
    //    - handler
    //    - event name
    //    - a unique string representing the target
    //
    //  bindings: {
    //    'channel-one': {
    //      channel: Pusher.Channel,
    //      eventBindings: {
    //        Ember.Route.toString(): [
    //          { handler: Function, eventName: String },
    //          { handler: Function, eventName: String }
    //        ]
    //      }
    //    }
    //  }
    //
    //  wire(target, channelName, events)
    //  ================
    //  Initialize object in bindings if it's empty, with eventBindings: {}
    //  If eventBindings.length for the current target is 0
    //    connect to the channel
    //    store channel in the hash
    //  For each event in events
    //    bind the channel to the eventName
    //    store the handler and eventName in the eventBindings array for this channel and controller
    //    the key for storing is in target._pusherTargetId()
    //    (we store the eventName for when we might want to programmatically unwire)
    //
    //
    //  unwire(route):
    //  =================
    //  get the channel object
    //  for each  handler, eventName in eventBindings for the current route
    //    call channel.unbind(eventName, handler)
    //  delete the routes record in EventBindings
    //  if eventBindings for this channel is empty
    //    unsubscribe from the channel
    //    delete the channel from bindings

    var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

    var Controller = Ember.Controller.extend({

      connection: null,
      isDisconnected: true,
      isConnected: Ember.computed.not('isDisconnected'),

      init: function() {
        this._super();
        this.set('bindings', {});
      },

      // Called by the application initializer
      didCreatePusher: function(pusher) {
        this.set('connection', pusher);
        pusher.connection.bind('connected',     __bind(this._didConnect,    this));
        pusher.connection.bind('disconnected',  __bind(this._didDisconnect, this));
        pusher.connection.bind('unavailable',   __bind(this._didDisconnect, this));
      },

      // @events a hash in the form { channel-name: ['event1', 'event2'] }
      // @target any object that responds to send() and _pusherEventsId()
      wire: function(target, channelName, events) {
        Ember.assert("Did you forget to extend the EmberPusher.Bindings mixin in " +
            "your class receiving events?", !!target._pusherEventsId);
        var channel = this.connectChannel(channelName),
            bindings = this.get('bindings'),
            targetId = target._pusherEventsId();

        // Setup the eventBindings array for this target
        if(!bindings[channelName].eventBindings[targetId])
          bindings[channelName].eventBindings[targetId] = [];

        // Iterate over the events and bind them
        events.forEach(function(eventName) {
          var normalizedEventName = Ember.String.camelize(eventName), handler;
          handler = function(data) {
            if(target.get('logPusherEvents')) {
              console.log(target.constructor.toString() +
                ": Pusher event received", eventName, data);
            }
            target.send(Ember.String.camelize(eventName), data);
          };
          channel.bind(eventName, handler);
          bindings[channelName].eventBindings[targetId].pushObject({
            handler: handler,
            eventName: eventName
          });
        });
      },

      connectChannel: function(channelName) {
        var pusher = this.get('connection'),
            bindings = this.get('bindings');
        if(!bindings[channelName]) {
          bindings[channelName] = { eventBindings: {} };
        }
        if(Ember.isEmpty(Object.keys(bindings[channelName].eventBindings))) {
          bindings[channelName].channel = pusher.subscribe(channelName);

          // Spit out a bunch of logging if asked
          if(this.namespace && this.namespace.PUSHER_OPTS.logAllEvents) {
            bindings[channelName].channel.bind_all(function(eventName, data) {
              console.log(
                "Pusher event received on " + channelName + ":",
                eventName,
                data
              );
            });
          }
        }
        return bindings[channelName].channel;
      },

      unwire: function(target, channelName) {
        var pusher = this.get('connection'),
            bindings = this.get('bindings'),
            targetId = target._pusherEventsId(),
            channel = bindings[channelName].channel;

        // Unbind all the events for this target
        for(var binding in bindings[channelName].eventBindings[targetId]) {
          channel.unbind(binding.eventName, binding.handler);
        }
        delete bindings[channelName].eventBindings[targetId];

        // Unsubscribe from the channel if this is the last thing listening
        if(Object.keys(bindings[channelName].eventBindings).length === 0) {
          pusher.unsubscribe(channelName);
          delete bindings[channelName];
          return true;
        }
        return false;
      },

      channelFor: function(channelName) {
        // debugger;
        return this.get('bindings')[channelName].channel;
      },

      socketId: function() {
        try {
          return this.get('connection').connection.socket_id;
        }
        catch(error) {
          console.warn(error);
        }
      }.property('isDisconnected'),

      _didConnect: function() {
        this.set('isDisconnected', false);
      },

      _didDisconnect: function() {
        this.set('isDisconnected', true);
      }

    });


    __exports__.Controller = Controller;
  });
define("ember-pusher/initializer",
  ["ember-pusher/controller","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Controller = __dependency1__.Controller;

    var global = (typeof window !== 'undefined') ? window : {},
        Ember = global.Ember,
        Pusher = global.Pusher;

    function initialize() {

      if(!Ember) { throw("Include Ember before EmberPusher"); }
      if(!Pusher) { throw("Include Pusher before EmberPusher"); }

      Ember.Application.initializer({
        name: "pusherConnected",

        initialize: function(container, application) {
          var pusherController, options, pusher, dict;

          dict = 'pusher:main';
          container.register(dict, Controller);

          pusherController = container.lookup(dict);
          options = application.PUSHER_OPTS;

          Ember.assert("You need to provide PUSHER_OPTS on your application", options);
          Ember.assert("You need to include the pusher libraries", Pusher);
          pusher = new Pusher(options.key, options.connection);
          pusherController.didCreatePusher(pusher);

          application.inject('controller', 'pusher', dict);
          application.inject('route', 'pusher', dict);
        }
      });

    }



    __exports__.initialize = initialize;
  });
define("ember-pusher",
  ["ember-pusher/controller","ember-pusher/bindings","ember-pusher/client_events","ember-pusher/initializer","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Controller = __dependency1__.Controller;
    var Bindings = __dependency2__.Bindings;
    var ClientEvents = __dependency3__.ClientEvents;
    var initialize = __dependency4__.initialize;

    initialize();



    __exports__.Controller = Controller;
    __exports__.Bindings = Bindings;
    __exports__.ClientEvents = ClientEvents;
    __exports__.initialize = initialize;
  });
window.EmberPusher = requireModule("ember-pusher");
})(window);