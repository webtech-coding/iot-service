const path = require('node:path');
const debug = require('debug')('App::productsController');
const {readFile, writeFile} = require('node:fs');
const {mqttClient} = require('./../mqttService');
const storagePath = path.resolve(process.env.STORAGE_PATH, './products.json')

const saveProduct = (product)=>{
    let storedProducts = []
    readFile(storagePath, (err, data)=>{            
        if(err){
            // check the error type, if there is no file proceed to write file
            const noFileError = err.message.toString().includes('ENOENT')
            if(noFileError){
                appendToFile(product)
            }else{
                throw Error(err)
            }
        }else{
            storedProducts = JSON.parse(data)  
            appendToFile(product, storedProducts)
        }
    })
}

const appendToFile = (newData, storedData)=>{

    let productsInStore = [];    
    productsInStore = storedData ? storedData : []   
    const allProducts = [...productsInStore, newData]
    
    writeFile(storagePath, JSON.stringify(allProducts), err=>{
        if(err){
            throw Error(err)
        }
        mqttClient.publish('products', JSON.stringify(allProducts))

    })
}

module.exports = {saveProduct}