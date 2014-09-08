import Ember from 'ember';

export default Ember.ObjectController.extend({
  isEditing: false,
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
      var self    = this;

      this.clearValidationErrors();

      product.save().then(function() {
        self.set('isEditing', false);
      }, function(reason) {
        self.set('validationErrors', reason.errors);
      });
    }
  },
  clearValidationErrors: function() {
    this.set('validationErrors', null);
  }
});
