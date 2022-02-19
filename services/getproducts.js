const Product = require('../models/product');

module.exports.getProducts = async()=>{
    var data={};
    const response = await Product.find()
        .then((products) => {
            data = { message:"product Data",product: products, status: 200, output: true };
            //console.log(data);
            return data;
        })
        .catch((err) => {
            data = { message: err.message, status: 500, output: false }
            return data;
        })

    return response;
}