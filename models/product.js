const mongoose = require('mongoose'); //require mongoose to use this App
const Review = require('./review.js');

const Schema = mongoose.Schema; // Schema Constructor Object

const productSchema = new Schema({
  name: {
    type : String,
    required: [true, 'Enter your damn name bru'],
    minlength: [2, 'Name must be 2 charecters or above']
    },
  price: {
    type: Number,
    required: [true, 'Please enter a price'],
    min: [0, 'please make your price 0 or above']
      },
  imageUrl: { type: String, required: true},
  description:  { type: String, required: true},
  reviews: [Review.schema]
});

// Product Schema gives us the power to require certain fields
//with certain data types
const Product = mongoose.model('product', productSchema);

module.exports = Product;  // Every time product.js is used, they get the Product
