import Ember from 'ember';

export default Ember.ArrayController.extend({
  categories: Ember.computed.mapBy('model', 'category'),
  uniqCategories: Ember.computed.uniq('categories')
});
