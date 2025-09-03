const express = require('express');
const cors = require('cors')
const debug = require('debug')('App:app');
const multer = require('multer')
const imageRouter = require('./routes/imageRouter');
const productRouter = require('./routes/productRouter')
const path = require('node:path')

const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:3000'
}))


const imageStoragePath = path.resolve(process.env.IMAGE_UPLOADS_PATH, 'images');
app.use(express.static(process.env.IMAGE_UPLOADS_PATH))

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageStoragePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


app.get('/',(req, res)=>{
    debug(`Api request ${req.url}`)
    res.status(200).json({message:'Welcome to your app'})
})

// Register routes for the application
app.use('/image', imageRouter);
app.use('/product', upload.single('image'), productRouter);

module.exports =  app