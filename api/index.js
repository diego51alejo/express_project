const express = require('express');
const routerApi = require('./routes');
const cors = require('cors')
const {checkApiKey} = require('./middlewares/auth.handler')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'http://myapp.co']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null,true)
    } else {
      callback(new Error ('not allowed'))
    }
  }
}

app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/api/nueva-ruta', checkApiKey,(req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(cors(options))

require('./utils/auth')

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('http://localhost:' +  port);
});

module.exports = app