import Ember from 'ember';

export default Ember.Route.extend({
   beforeModel: function () {
      this._super.apply(this, arguments);
      return this.csrf.fetchToken();
    }
});
