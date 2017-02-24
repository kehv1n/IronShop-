const express = require('express');
const Product = require('../models/product.js'); //Needs Database Info So we need to require
const router = express.Router(); //Built it into express
//Used to replace app.get
// so Router.get


router.get('/products',(req, res, next) =>{
  //Query DB find (no filter)(no projection)
  Product.find((err, products) => {
    if (err) {
      next(err);
      return;
    }
    //Display views/products/index.ejs
    res.render('products/index', {
      products: products
    });
  });
});

router.get('/products/new', (req, res, next) => {
  //display views/products/new.ejs
  res.render('products/new');
});

router.post('/products', (req, res, next) => {
  const productInfo = {
  name: req.body.name, /// CORRESPOND TO THE INPUT NAMES
  price: req.body.price,// IN FORM
  imageUrl: req.body.imageUrl,
  description: req.body.description
};

  const theProduct = new Product(productInfo);

  theProduct.save((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/products');
  });
});

module.exports = router;
