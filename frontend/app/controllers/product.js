import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    startEditing: function() {
      this.set('isEditing', true);
    },
    cancelEditing: function() {
      var product = this.get('model');
      product.rollback();
      this.set('isEditing', false);
    },
    submit: function() {
      var product = this.get('model');
      var self = this;

      self.set('validationErrors', null);
     
      product.save().then(function() {
        self.set('isEditing', false);
      }, function(reason) {
        self.set('validationErrors', reason.errors);
        product.rollback();
      });
    }
  }
});
