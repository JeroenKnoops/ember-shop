import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['category'],
  category: null,
  categories: Ember.computed.mapBy('model', 'category'),
  uniqCategories: Ember.computed.uniq('categories'),
  filteredContent: function() {
    var category = this.get('category');
    var products = this.model;

    if (category) {
      products =  products.filterBy('category.name', category);
    }

    return products;
  }.property('category', 'model', 'model.@each', 'model.@each.category')
});
