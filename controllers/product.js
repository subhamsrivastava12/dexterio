const {getProducts} = require("../services/getproducts");
const {addProducts}=require("../services/addproducts");
const {updateProducts}=require("../services/updateproducts");

module.exports.getProducts=async(req,res)=>{
    getProducts()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

module.exports.addProducts=async(req,res)=>{
    addProducts()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}

module.exports.updateProducts=async(req,res)=>{
    updateProducts()
    .then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).send(err.message);
    })
}