import Ember from 'ember';

export default Ember.ArrayController.extend({
  queryParams: ['category'],
  category: '', // using an empty string as the default property value removes the query params from the link-to-generated URL
                // https://github.com/emberjs/ember.js/issues/5274#issuecomment-50454222
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
