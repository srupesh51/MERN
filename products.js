var express = require('express');
var router = express.Router();
var productHandlers = require('./handlers/product_handlers');
/* GET products listing. */
router.get('/products', function(req, res, next) {
  productHandlers.getProducts(function(error, products){
    if(error){
      res.json({'status': 400, 'products': null});
      return;
    }
    res.json({'status': 200, 'products': products});
  });
});


/* save products */
router.post('/new-product', function(req, res, next) {
  if(!req.body.title || !req.body.price){
    res.json({'status': 400, 'missingParams': 'Parameter Missing'});
    return;
  }
  productHandlers.saveProduct(req.body, function(error, products){
    if(error){
      res.json({'status': 400, 'products': null});
      return;
    }
    res.json({'status': 200, 'products': products});
  });
});

module.exports = router;
