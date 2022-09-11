const { validationResult, body } = require('express-validator')
const ObjectId = require('mongoose').Types.ObjectId
const commentModel = require('../models/comments')
module.exports = {
  getById: async function(req, res, next) {
    try {
      const result = await commentModel.findById(req.params.commentId)
      if (result === null) {
        return res.status(404).json({message: 'Not found'})
      }
      return res.status(200).json({status:'success', message: 'Comment found!!!', data: result})
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  },
  getAll: async function(req, res, next) {
    try {
      const result = await commentModel.find({})
      return res.status(200).json({status:'success', message: 'Comment list found!!!', data: result})
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  },
  updateById: async function(req, res, next) {
    const newCommentObj = {
      comment: req.body.comment
    }
    try {
      const result = await commentModel.findByIdAndUpdate(req.params.commentId, newCommentObj)
      if (result === null) {
        return res.status(404).json({message: 'Not found'})
      }
      return  res.status(200).json({status:'success', message: 'Comment updated successfully!!!', data: result})
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  },
  deleteById: async function(req, res, next) {
    try {
      const result = await commentModel.findByIdAndRemove(req.params.filmId)
      if (result === null) {
        return res.status(404).json({message: 'Not found'})
      }
      return res.status(200).json({status:'success', message: 'Comment deleted successfully!!!', data:result})
    } catch(err) {
      return res.status(500).json({message: err.message})
    }
  },
  create: async function(req, res, next) {
    console.log('reqbody==', req.body)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    try {
      if (ObjectId.isValid(req.body.filmId) && ObjectId.isValid(req.body.userId)) {
        const newFilmObj = {
          filmId: req.body.filmId,
          userId: req.body.userId,
          comment: req.body.comment
        }
        const result = await commentModel.create(newFilmObj)
        return res.status(200).json({status: 'success', message: 'Comment added successfully!!!', data: result})
      } else {
        return res.status(422).json({message: 'Invalid filmId or userId is provided'})
      }
    } catch(err) {
      return res.status(500).json({message: err.message})
    }

  },
  validate: function(method) {
    switch (method) {
    case 'create': {
      return [
        body('filmId', 'name can not be empty').exists(),
        body('userId', 'description can not be empty').exists(),
        body('comment', 'releasedDate can not be empty').exists()
      ]
    }
    }
  }
}
