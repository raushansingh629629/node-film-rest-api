const express = require('express')
const logger = require('morgan')
const films = require('./routes/films')
const users = require('./routes/users')
const comments = require('./routes/comments')
const bodyParser = require('body-parser')
const mongoose = require('./config/database') //database configuration
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')
//const swaggerDocument = require('./swagger.json')
let jwt = require('jsonwebtoken')
const app = express()
app.set('secretKey', 'nodeRestApi') // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/', function(req, res){
  res.json({'tutorial' : 'Build Film REST API with express.js'})
})


// public route
app.use('/users', users)
// private route
app.use('/films', validateUser, films)
app.use('/comments', validateUser, comments)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
function validateUser(req, res, next) {
  console.log('req.headers', req.headers)
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:'error', message: err.message, data:null})
    }else{
      // add user id to request
      req.body.userId = decoded.id
      next()
    }
  })

}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})
// handle errors
app.use(function(err, req, res, next) {
  console.log(err)

  if(err.status === 404)
    res.status(404).json({message: 'Not found'})
  else
    res.status(500).json({message: 'Something looks wrong :( !!!'})
})

/*app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
)*/
app.listen(3000, function(){
  console.log('Node server listening on port 3000')
})