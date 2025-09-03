const {v4:uuid} = require('uuid');

/**
 * A middleware to store uploaded image and generate ID from the product data
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const storeImage =(req, res, next)=>{
    const product = req.body
    const imageFile = req.file
    let imageUrl = ""
    if(imageFile){
        imageUrl = `http://localhost:${process.env.PORT}/images/${imageFile.filename}`
    }

    if(!product) {
        return res.status(400).json({message:'Invalid product data'})
    }
    req.body = {...req.body, id:uuid(), imageUrl}    
    next();
}

module.exports = {storeImage};