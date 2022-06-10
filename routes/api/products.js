var express = require('express');
var router = express.Router();
var {Product}= require("../../models/product")
const validateTheProduct=require("../../middlewares/validateProduct")



//api for all products
router.get('/api', async function(req, res, next) {
  let page=Number(req.query.page?req.query.page:1);
  let perPage= Number(req.query.perPage?req.query.perPage:10);
  let skipRecords=(perPage*(page-1));


  let products=await Product.find().skip(skipRecords).limit(perPage);
  res.send(products)
});

//api for single product
router.get('/api/:id', async function(req, res, next) {
  try{
    let product=await Product.findById(req.params.id);
    if(!product) 
    return res.status(400).send("Product with given ID is not present")
    return res.send(product)
  }catch (err){
    res.send("Invalid ID")
    return res.status(400).send("Product with given ID is not present")
  }

});

//api to update a product
router.put("/api/:id", async function(req, res, next) {
  let product=await Product.findById(req.params.id);
  product.name=req.body.name,
  product.desc=req.body.desc,
  product.price=req.body.price,
  product.img=req.body.img,
  await product.save();

  res.send(product)
});

//api to delete a product
router.delete("/api/:id", async function(req, res, next) {
  let product=await Product.findByIdAndDelete(req.params.id);

  res.send(product)
});

//api to add a new product
router.post('/api', async function(req, res, next) {

  let product=new Product({
    name:req.body.name,
    desc:req.body.desc,
    price:req.body.price,
    img:req.body.img,
  })

  try{
      await product.save();
  }catch{
      console.log(error);
  }
  
  res.send(product)

  return
});






module.exports = router;