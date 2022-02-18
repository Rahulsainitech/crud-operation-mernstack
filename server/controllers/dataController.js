const Product = require('../models/userSchema')
const mongoose = require('mongoose');
// const { all } = require('../routes/product-routes');

const getProduct = async (req, res, next) => {
    let allData;
      try {
          allData = await Product.find()
      } catch (error) {
          console.log(error)
          return next()
      }
      if (!allData) {
          res.status(404).json("data is not found")
      } else {
        //   console.log(allData)
          res.status(200).json({ allData: allData })
  
      }
  }

  const getProductById = async(req,res,next)=>{
    const productId = req.params.id
    let product;
    try {
        product = await Product.find({_id:productId})
    } catch (error) {
        console.log(error)
        return next()
    }
    if(!product){
        res.status(404).json("data not found")
    }else{
        res.status(200).json({product:product})
        // console.log(product)
    }
    
}

const addProduct = async(req,res,next)=>{
    // const data = await req.body
    // const dat = await Product.insertMany(data.data)
    let product;
    try {
        product = new Product({
            userId:req.body.userId,
            id:req.body.id,
            title:req.body.title,
            body:req.body.body,
        })
         product = await product.save()
    } catch (error) {
        console.log(error)
        return next();        
    }
    res.status(200).json({product:product})
}

const updateProduct = async(req,res,next)=>{
    const ProductId = req.params.id;
    console.log(ProductId)
    const{userId,id,title,body}= req.body;
    let product;
    try {
        product= await Product.findByIdAndUpdate(ProductId,{
            userId,
            id,
            title,
            body
        },{ new: true })
    } catch (error) {
        console.log(error)
        return next()
    }
    try {
         await product.save()   
    } catch (error) {
        console.log("saving failed",error)
        return next()
    }
    res.status(200).json({product})
}

// const deleteProduct = async(req,res,next)=>{
//     let product;
//     try {
//         product = await Product.deleteMany({})
//     } catch (error) {
//         console.log(error)
//         return next()
//     }
//     if(!product){
//         res.status(404).json("not found any data")
//     }else{
//         res.status(200).json({product:product})
//     }

// }
const deleteProductById = async(req,res,next)=>{
    const deleteProduct = req.params.id;
    console.log(deleteProduct)
    let product;
    try {
        product = await Product.deleteOne({_id:deleteProduct})
    } catch (error) {
        console.log(error)
        return next()
    }
    if(!product){
        res.status(404).json("not found any data")
    }else{
        res.status(200).json({product:product})
    }
}

exports.getProduct = getProduct;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.updateProduct = updateProduct;
// exports.deleteProduct= deleteProduct;
exports.deleteProductById= deleteProductById;