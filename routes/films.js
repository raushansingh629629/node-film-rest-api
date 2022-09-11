const express = require('express')
const router = express.Router()
const filmController = require('../app/api/controllers/films')
router.get('/', filmController.list)
router.post('/',
  filmController.validate('create'),
  filmController.create)
router.get('/:filmId', filmController.show)
router.put('/:filmId', filmController.updateById)
router.delete('/:filmId', filmController.deleteById)
module.exports = router
