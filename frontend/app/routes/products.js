import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('product');
  },
  actions: {
    didTransition: function() {
      this.reload();
    },
  },
  reload: function() {
    var _this = this;
    Ember.run.later(function() {
      _this.model();
      _this.reload();
    }, 5000);
  }
});
