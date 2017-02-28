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


router.get('/products/:theProductid',(req, res, next) => {
   ///                ----- (cologn === placeholder)
   ///                  | Direct Connection (must be the same)
   ///                  -----| (since its a req.params it pulls from URl)
  let productId = req.params.theProductid;
    Product.findById(productId,(err, prodDoc) => {
      if (err) {                      //^
        next(err);                    //| Direct Connection
      }                              // | You are passing prodDoc
                                    //  | Into the 'view' page
      res.render('products/show',{ //   | 'products/show'
        product:prodDoc  // <-----------
      });
    });
});

router.get('/products/:id/edit',(req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId, (err, prodDoc) => {
    if (err) {
      next (err);
      return;
    }
    res.render('products/edit', {
      product: prodDoc
    });
  });
});

router.post('/products/:id',(req, res, next) => {
  // First, make a variable for the submitted Info
  const productId = req.params.id;
  const updates = {
    name: req.body.name,
    price: req.body.price,
    imageUrl: req.body.imageUrl,
    description: req.body.description
  };
  //db.products.updateOne({_id: productId},{$set: updates})
  Product.findByIdAndUpdate(productId, updates, (err, product) => {
    if (err) {
      next (err);
      return;
    }
    res.redirect('/products');
  });
});

router.post('/products/:id/delete', (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndRemove(productId, (err, product) => {
    if (err) {
      next(err);
      return;
      }
  });
  res.redirect('/products');
});


module.exports = router;
