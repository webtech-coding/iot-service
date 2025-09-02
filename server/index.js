require('dotenv').config()
const imageRouter = require('./routes/imageRouter');
const productRouter = require('./routes/productRouter')
const debug = require('debug')('App:server');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./api_docs/swagger.json');

const app = require('./app');

// Register API-swagger docs
app.use('/api-docs', swaggerUI.serve);
app.use('/api-docs', swaggerUI.setup(swaggerDoc));

// Register routes for the application
app.use('/image', imageRouter);
app.use('/product', productRouter);

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    debug(`Server initiated on the PORT ${PORT}`)
})