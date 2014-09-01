import Ember from 'ember';

var Router = Ember.Router.extend({
  location: ShopENV.locationType
});

Router.map(function() {
  this.resource('products');
  this.route('product', { path: 'products/:product_id' });
  this.route('about');
  this.route('application');
});

export default Router;
