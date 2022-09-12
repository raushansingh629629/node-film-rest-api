const { validationResult, body } = require('express-validator')
const filmModel = require('../models/films')
module.exports = {
  show: async function(req, res, next) {
    try {
      const result = await filmModel.findById(req.params.filmId)
      if (result === null) {
        return res.status(404).json({message: 'Not found'})
      }
      return res.status(200).json({status:'success', message: 'Film found!!!', data:{films: result}})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  },
  list: async function(req, res, next) {
    let filmsList = []
    try {
      const result = await filmModel.find({})
      result.forEach(film=> {
        filmsList.push({
          id: film._id,
          name: film.name,
          description: film.description,
          releasedDate: film.releasedDate,
          rating: film.rating,
          review: film.review,
          country: film.country,
          genre: film.genre,
          photo: film.photo,
          reviewerId: film.reviewerId
        })
      })
      return res.status(200).json({status:'success', message: 'Film list found!!!', data:{films: filmsList}})
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  },
  updateById: async function(req, res, next) {
    try {
      if (req.body.rating && !['1','2','3','4','5'].includes(req.body.rating)) {
        return res.status(422).json({message: 'Rating must be in between 1 to 5'})
      }
      const result = await filmModel.findByIdAndUpdate(req.params.filmId,req.body)
      if (result === null) {
        return res.status(404).json({message: 'Not found'})
      }
      return  res.status(200).json({status:'success', message: 'Film updated successfully!!!', data:{films: result}})
    }catch(err) {
      return res.status(500).json({message: err.message})
    }
  },
  deleteById: async function(req, res, next) {
    try {
      const result = await filmModel.findByIdAndRemove(req.params.filmId)
      if (result === null) {
        return res.status(404).json({message: 'Not found'})
      }
      return res.status(200).json({status:'success', message: 'Film deleted successfully!!!', data:{films: result}})
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  },
  create: async function(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    try {
      const newFilmObj = {
        name: req.body.name,
        description: req.body.description,
        releasedDate: req.body.releasedDate ,
        rating: req.body.rating,
        review: req.body.review,
        country: req.body.country,
        genre: req.body.genre,
        photo: req.body.photo,
        reviewerId: req.body.reviewerId
      }
      const result = await filmModel.create(newFilmObj)
      return res.status(200).json({status: 'success', message: 'Film added successfully!!!', data: result})
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  },
  validate: function(method) {
    switch (method) {
    case 'create': {
      return [
        body('name', 'name can not be empty').exists(),
        body('description', 'description can not be empty').exists(),
        body('releasedDate', 'releasedDate can not be empty').exists(),
        body('rating', 'rating must be in between 1 to 5').exists().isIn(['1', '2','3','4','5']),
        body('review', 'review can not be empty').exists(),
        body('country', 'country can not be empty').exists(),
        body('genre', 'genre can not be empty').exists(),
        body('photo', 'photo can not be empty').exists(),
        body('reviewerId', 'reviewerId can not be empty').exists()
      ]
    }
    }
  }
}
