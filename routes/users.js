const express = require('express')
const router = express.Router()
const userController = require('../app/api/controllers/users')
router.post('/signup',
  userController.validate('create'),
  userController.create)

router.post('/authenticate',
  userController.authenticate)
module.exports = router
