var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var ProductSchema   = new Schema({
    title: String,
    price: Number
});

const productModel = mongoose.model('Product', ProductSchema);

module.exports = productModel;
