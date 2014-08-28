import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('product', params.product_id);
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('isEditing', false);
  }
});
