import DS from 'ember-data';

var Product = DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  price: DS.attr(),
  numberOfReviews: function() {
    return this.get('_data.reviews.length');
  }.property('reviews.length'),
  stars: DS.attr(),
  imageUrl: DS.attr(),
  reviews: DS.hasMany('review', { async: true })
});

Product.reopenClass({
  FIXTURES: [
    { id: 1,
      title: 'Drop'
  },
    { id: 2,
      title: 'Zuurstokken'
  }
  ]
});

export default Product;
