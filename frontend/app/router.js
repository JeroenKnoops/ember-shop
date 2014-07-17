import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ShopENV.locationType
});

Router.map(function() {
  this.resource('products');
});

export default Router;
