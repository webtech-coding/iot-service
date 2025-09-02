const express = require('express');
const debug = require('debug')('App:app');

const app = express();

app.use(express.json());

app.get('/',(req, res)=>{
    debug(`Api request ${req.url}`)
    res.status(200).json({message:'Welcome to your app'})
})

module.exports =  app