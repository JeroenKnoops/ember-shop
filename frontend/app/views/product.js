import Ember from 'ember';

export default Ember.View.extend({
  resetIsEditing: function() {
    this.get('controller').set('isEditing', false);
  }.on('willInsertElement')
});
