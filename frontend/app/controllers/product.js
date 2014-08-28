import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    startEditing: function() {
      this.set('isEditing', true);
    },
    stopEditing: function() {
      this.set('isEditing', false);
    },
    submit: function() {
      var product = this.get('model');
      var self = this;

      product.save().then(function() {
        self.set('isEditing', false);
      },
                         function() {
                           alert('Ah, snap!');
                         });
    }
  }
});
