const products=require("../utils/data");
const Product = require('../models/product');
const {Id_modifier}=require('../utils/id_modifier');
const {spaceValidator,imageAltTextvalidator,emailValidator,applicationFieldValidator} =require("../utils/data_validation");
module.exports.addProducts=async() =>{
    var bool=true;
    var data={};
    var prod={};
    console.log("product",products.products.length);
    //products.products.length
    for(var i=0;i<1;i++){
        var product=Id_modifier(products.products[i]);
        var product1=spaceValidator(product);
        //console.log("data1",product1);
        product1=imageAltTextvalidator(product1);
        //console.log("data2",product1);
        product1=applicationFieldValidator(product1);
        //console.log("data3",product1);
        if(emailValidator(product1)){
            // prod=JSON.stringify(product1);
            var new_product=new Product(product1);
            console.log("prod1",new_product);
            var response = await new_product
                .save()
                .then((savedproduct) => {
                    data = { message:"product detail", product:savedproduct,status: 200, output: true };
                    return data;
                })
                .catch((err) => {
                console.log("errmsg",err.message);
                data = { message: err.message, status: 500, output: false };
                return data;
                });
            
            return response;
            // await Product.create(product1);
        }
        
    }
    data={message:"unable to add products",status:200};
    return data;
}