const products=require("../utils/data1");
const Product = require('../models/product');
const {spaceValidator,imageAltTextvalidator,emailValidator,applicationFieldValidator} =require("../utils/data_validation");
const {generateId} = require('../utils/id_generator');

module.exports.updateProducts=async() =>{
    var version={};
    var bool=true;
    for(var i=0;i<1;i++){
        var productIdstring=products.products[i].primaryCategory.categoryId+products.products[i].title;
        var product_id=generateId(productIdstring);
        //console.log("pId",product_id);
        var product=spaceValidator(products.products[i]);
        //console.log("p1",product);
        var product1=imageAltTextvalidator(product);
        //console.log("p2",product1);
        product1=applicationFieldValidator(product1);
        if(emailValidator(product1)){
            console.log("p3",product1)

            var response=await Product.find({"id":product_id},{"__v":1})
                .then((data) => {
                    version=data[0].__v;
                })
                .catch((err) => {
                    bool=false;
                console.log("errmsg",err.message);
                data = { message: err.message, status: 500, output: false };
                return data;
                });
            if(!bool){
                return response;
            }
            product1.__v=version+1;
            response = await Product.findOneAndUpdate({"id":product_id},product1)
                .then(() => {
                    data = { message:"product details updated",status: 200, output: true };
                    return data;
                })
                .catch((err) => {
                console.log("errmsg",err.message);
                data = { message: err.message, status: 500, output: false };
                return data;
                });
            
            return response;
            ;
        }
                
    }
    data={message:"unable to update products",status:200};
    return data;
}
