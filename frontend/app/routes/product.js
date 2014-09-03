import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
     willTransition: function(transition) {
       var product = this.modelFor(this.routeName);
       if (product.get('isDirty')) {
         product.rollback();
         this.controller.clearValidationErrors();
       }
    }
  }
});
