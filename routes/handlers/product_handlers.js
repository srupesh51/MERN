var productModel = require('../models/product');

const saveProduct = function(productObj, done){
  productObj = {
    title: productObj.title,
    price: productObj.price
  }
  const newProduct = new productModel(productObj);
  newProduct.save(function(err){
    if (err){
      done({"Error": "Failed to save Products"}, null);
      return;
    }
    done(null,null);
  });
};

const getProducts = function(done){
  productModel.find({}, function(err, products){
    if (err) {
      done({"Error": "Failed to get All Products"}, null);
      return;
    }
    done(null, products);
  });
};

module.exports = {
  saveProduct: saveProduct,
  getProducts: getProducts
}
