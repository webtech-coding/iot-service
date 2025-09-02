const router = require('express').Router();

router.route('/').post((_, res)=>{
    console.log('post request for the image upload')
    res.status(201).json({message:'Image uploaded'});
}).get((_, res)=>{
    res.status(200).json({message:'sending images...'})
})

module.exports = router