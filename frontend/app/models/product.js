import DS from 'ember-data';

var Product = DS.Model.extend({
  title: DS.attr()
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
