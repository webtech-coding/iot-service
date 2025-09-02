const Router = require('express').Router();

Router
    .route('/')
    .post((req, res)=>{
        res.status(200).json({message:req.query.id})
    })

module.exports= Router