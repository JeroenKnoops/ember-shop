/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    title: {
      type: 'string'
    },

    description: {
      type: 'text'
    },

    price: {
      type: 'float'
    },

    image: {
      type: 'text'
    },

    category: {
      model: 'Category'
    },

    reviews: {
      collection: 'Review'
    }

  },

    review_ids: function(done) {
      var tmp_review_ids;
      reviews.forEach(function(review){
        tmp_review_ids += review.id
      })
      done(tmp_review_ids);
      }
};

