const Router = require('express').Router();
const debug = require('debug')('App:productRouter');
const { saveProduct } = require('./../controller/productController');
const { storeImage } = require('./../middleware/productsMiddleWare');

Router
    .route('/')
    .post(storeImage, (req, res)=>{
        const productData = req.body      
        
        try {
            saveProduct(productData)

        } catch (error) {
            debug(error)
            return res.status(500).json({message:error.message})
        }

        res.status(200).json({...productData})
    })

module.exports= Router