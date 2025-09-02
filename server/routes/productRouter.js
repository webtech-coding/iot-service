const Router = require('express').Router();
const debug = require('debug')('App:productRouter')
const { writeFile, readFile } = require('node:fs');
const path = require('node:path');
const {saveProduct} = require('./../controller/productController');


Router
    .route('/')
    .post((req, res)=>{
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