'use strict'

const MockSchema = require('./mockSchema')

class Films extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.name = this.name || 'gravity'
    this.description = this.description || 'science & fiction'
    this.releasedDate = this.releasedDate || '5-09-1997'
    this.rating = this.rating || '4'
    this.review = this.isReviewer || 'was good'
    this.country = this.country || 'us'
    this.genre = this.genre || 'science & fiction'
    this.photo = this.photo || 'base64 string'
    this.reviewerId = this.reviewerId || '12345'
    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()

  }

  static create(values = {}) {
    return new Films(values)
  }
}

module.exports = {
  Films
}
