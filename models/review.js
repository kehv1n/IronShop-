const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ReviewSchema = new Schema({
  content:
    {type : String,
    required: true} ,
  stars:
  { type: Number,
    required: true,
    min: 0,
    max: 5
  },
  author:
    {type: String,
    required: true}
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
