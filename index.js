const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product");
const mongoose = require("mongoose")
const dotenv = require('dotenv');

dotenv.config();
const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/products',productRoutes);
const PORT = process.env.PORT || 3000;

app.get('/testroute',(req,res)=>{
    res.send("This is Test route");
})

//app.listen(PORT,()=>console.log("server is running"))

//------------------------------------------------
//remove comments and add your connection_url value


mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>app.listen(PORT,()=>console.log("server is running")))
  .catch((error)=>
  {
      console.log("err",error.message);
      process.exit();
  });