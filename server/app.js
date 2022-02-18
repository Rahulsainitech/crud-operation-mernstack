// import statement
const express = require('express');
const  mongoose = require('mongoose');
const app = express()
const dataRouter = require('./routes/product-routes')
const {keys}=require('./config/keys')
const PORT = process.env.PORT || 5000;

//middleware dynamic routing also
app.use(express.json()); 
app.use('/',dataRouter);

if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
//connection and port
const url = "mongodb+srv://geeta:geeta9812@cluster0.5pxjb.mongodb.net/instagramClone?retryWrites=true&w=majority"
mongoose.connect(url).then(()=>{
    console.log('we are connected to the database')
    app.listen(PORT,()=>{
        console.log(`server is listening on ${PORT}`)
    })
}).catch((e)=>{
    console.log(e)
})


