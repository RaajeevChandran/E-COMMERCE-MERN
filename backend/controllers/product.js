const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash")
const fs = require("fs")

exports.getProductById=(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                err:"Product not found"
            })
        }
        req.product = product
        next()
    })
}

exports.createProduct = (req,res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        
        //destructure the fields
        const {name,description,price,category,stock} = fields
        
        if( !name || !description || !price || !category || !stock ){
            return res.status(400).json({
                err:"Please include all fields"
            })
        }

        
        let product = new Product(fields)
        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to DB
        product.save((err,product)=>{
            if(err){
                
                return res.status(400).json({
                    err:"Cannot save image to DB"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req,res)=>{
    req.product.photo = undefined
    return res.json(req.product)
}

//middleware
exports.photo = (req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

//delete controllers
exports.deleteProduct =(req,res) =>{
    let product = req.product
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error:"Failed to delete the product"
            })
        }
        res.json({
            message:"Deleted successfully",
            deletedProduct
        })
    })
}


//update controllers
exports.updateProduct =(req,res) =>{
    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error:"problem with image"
            })
        }
        
        //updation code
       let product = req.product
       product = _.extend(product,fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error:"File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //save to DB
        product.save((err,product)=>{
            if(err){
                
                return res.status(400).json({
                    err:"Updation of product failed"
                })
            }
            res.json(product)
        })
    })
}

//listing all products

exports.getAllProducts = (req,res) =>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()
    .select("-photo") //'-' symbolises do not search by photo 
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                err:"NO PRODUCT FOUND"
            })
        }
        res.json(products)
    })
}


exports.getAllUniqueCategories = (req,res) => {
    Product.distint("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Cannot fetch distinct categories"
            })
        }
        res.json(category)
    })
}



exports.updateStock = (req,res,next) => {

    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id : prod._id},
                update:{$inc : {stock: -prod.count, sold: +prod.count}} //count will be triggered from the front end

            }
        }
    } )

    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Bulk operation failed"
            })
        }
        next()
    })
}