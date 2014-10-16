import DS from 'ember-data';

var Product = DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  price: DS.attr(),
  numberOfReviews: function() {
    return this.get('_data.reviews.length');
  }.property('reviews.length'),
  stars: DS.attr(),
  image: DS.attr(),
  reviews: DS.hasMany('review', { async: true }),
  category: DS.belongsTo('category'),
  categoryName: function() {
    return this.get('category.name');
  }.property('category')
});

export default Product;
