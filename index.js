const express = require('express')
const logger = require('morgan')
const films = require('./routes/films')
const users = require('./routes/users')
const comments = require('./routes/comments')
const bodyParser = require('body-parser')
const mongoose = require('./config/database') //database configuration
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')
const userModel = require('./app/api/models/users')
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
  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:'error', message: err.message, data:null})
    }else{
      // add user id to request
      req.body.userId = decoded.id
      if (req.method !== 'GET') {
        userModel.findById(req.body.userId, function(err, userInfo){
          if (err) {
            res.json({status:'error', message: err.message, data:null})
          } else {
            if (userInfo.isReviewer === 'true') {
              next()
            } else {
              res.status(401).json({status:'permission error', message: 'You Do Not Have Reviewer Role', data:null})
            }
          }
        })
      } else {
        next()
      }
    }
  })

}

// handle errors
app.use(function(err, req, res, next) {
  console.log(err)

  if(err.status === 404)
    res.status(404).json({message: 'Not found'})
  else
    res.status(500).json({message: 'Something looks wrong :( !!!'})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, function(){
  console.log(`Node server listening on port ${PORT}`)
})
