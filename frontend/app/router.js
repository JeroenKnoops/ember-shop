import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('products');
  this.route('product', { path: 'products/:product_id' });
  this.route('about');
  this.route('application');
});

export default Router;
