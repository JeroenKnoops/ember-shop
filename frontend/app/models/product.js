import DS from 'ember-data';

var Product = DS.Model.extend({
  title: DS.attr(),
  description: DS.attr(),
  price: DS.attr(),
  number_of_reviews: DS.attr(),
  stars: DS.attr(),
  image_url: DS.attr()
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
