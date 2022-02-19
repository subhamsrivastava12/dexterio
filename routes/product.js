const express = require("express");
const router = express.Router();
const {getProducts,addProducts,updateProducts}= require("../controllers/product");


router.get('/',getProducts);
router.post('/',addProducts);
router.put('/',updateProducts);



module.exports=router;