const express = require('express');
const Product = require('../models/product.js');
const Review = require('../models/review.js');
const router = express.Router(); //Built it into express

router.get('/products/:productId/reviews/new', (req, res, next) => {
  const productId = req.params.productId;
  //// Query Database for product info
  Product.findById(productId, (err, prodDoc) => {
    if (err) {
      next(err);
      return;
    }
    res.render('product-reviews/new', { //Render starts looking @ views
      product: prodDoc
    });
  });
});

router.post('/products/:productId/reviews', (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId, (err, prodDoc) => {
    if (err) {
      next(err);
      return;
    }
  const reviewInfo = {
    content: req.body.content,
    stars: req.body.stars,
    author: req.body.author
    };
    const theReview = new Review(reviewInfo);

    prodDoc.reviews.push(theReview);

    prodDoc.save((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect(`/products/${productId}`);
    });
  });
});

module.exports = router;
