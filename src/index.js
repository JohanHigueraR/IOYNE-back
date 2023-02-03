const express = require('express');
const morgan = require('morgan');
const ioyneRouter = require('./routes/ioyne.routes')
const cors = require('cors')


// starting the server with express in "app" variable
const app = express();
app.use(cors())

// allows http request on terminal  
app.use(morgan('dev'));

// Leer json e inicializar middlewares
app.use(express.json());

// Use routes of ioyne
app.use(ioyneRouter)

// Error middleware

app.use((err, req, res, next) => {
  return res.json({
      message: err.message
  })
})

// starting the server on port 4000
app.listen(4000);
console.log('server on port 4000') 

