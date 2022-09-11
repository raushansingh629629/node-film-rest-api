const { validationResult, body } = require('express-validator')
const userModel = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = {
  create: async function(req, res, next) {
    try{
      const errors = validationResult(req) // Finds the validation errors in this request and wraps them in an object
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        description: req.body.description,
        isReviewer: req.body.isReviewer
      }
      const isUserAlredayExists = await userModel.findOne({'email': req.body.email})
      if (!isUserAlredayExists) {
        const result = await userModel.create(newUser)
        return res.status(200).json({status: 'success', message: 'User added successfully!!!', data: result})
      } else {
        return res.status(422).json({message: 'User Alreday Exists'})
      }
    } catch(err) {
      return res.status(500).json({message: err.message})
    }

  },
  authenticate: async function(req, res, next) {
    console.log('from auth==', req.headers)
    try {
      const userInfo = await userModel.findOne({'email': req.body.email})
      if(userInfo) {
        if(bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '12h' })
          return res.status(200).json({status:'success', message: 'user found!!!', data:{user: userInfo, token:token}})
        }else{
          return res.status(422).json({status:'error', message: 'Invalid email/password!!!', data:null})
        }
      }
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  },
  validate: function(method) {
    switch (method) {
    case 'create': {
      return [
        body('name', 'name can not be empty').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'password can not be empty').exists(),
        body('description', 'description can not be empty').exists(),
        body('isReviewer', 'isReviewer can not be empty').exists()
      ]
    }
    case 'authenticate': {
      body('email', 'Invalid email').exists().isEmail(),
      body('password', 'password can not be empty').exists()
    }
    }
  }
}
