require('dotenv').config()

const debug = require('debug')('App:server');
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./api_docs/swagger.json');

const app = require('./app');

// Register API-swagger docs
app.use('/api-docs', swaggerUI.serve);
app.use('/api-docs', swaggerUI.setup(swaggerDoc));

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    debug(`Server initiated on the PORT ${PORT}`)
})