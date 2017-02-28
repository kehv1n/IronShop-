const mongoose = require('mongoose'); //require mongoose to use this App
const Review = require('./review.js');

const Schema = mongoose.Schema; // Schema Constructor Object

const productSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  description: String,
  reviews: [Review.schema]
});

// Product Schema gives us the power to require certain fields
//with certain data types
const Product = mongoose.model('product', productSchema);

module.exports = Product;  // Every time product.js is used, they get the Product
