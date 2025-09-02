const {v4:uuid} = require('uuid');

const storeImage =(req, res, next)=>{
    const product = req.body

    if(!product) {
        return res.status(400).json({message:'Invalid product data'})
    }
    req.body = {...req.body, id:uuid()}    
    next();
}

module.exports = {storeImage};