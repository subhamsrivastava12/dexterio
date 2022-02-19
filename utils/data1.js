const fs = require('fs');
var path = require('path');

var jsonPath = path.join(__dirname, './data1.json');
var data=fs.readFileSync(jsonPath,'utf8');
var productData = JSON.parse(data);
// console.log(productData.productData.products[0]);

module.exports.products=productData.productData.products;