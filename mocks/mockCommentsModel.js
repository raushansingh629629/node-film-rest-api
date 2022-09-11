'use strict'

const MockSchema = require('./mockSchema')

class Comment extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.filmId = this.name || '53b1c579bdf3de74f76bdac9'
    this.userId = this.email || '53b1c579bdf3de74f76bfd48'
    this.comment = this.password || 'This is test comment'
    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()
  }

  static create(values = {}) {
    return new Comment(values)
  }
}

module.exports = {
  Comment
}
