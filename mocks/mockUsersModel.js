'use strict'

const MockSchema = require('./mockSchema')

class Users extends MockSchema {
  constructor(values = {}) {
    super(values)

    this.name = this.name || 'Raushan'
    this.email = this.email || 'test@gmail.com'
    this.password = this.password || 'test@123'
    this.description = this.description || 'test description'
    this.isReviewer = this.isReviewer || 'false'
    this.createdAt = this.createdAt || new Date()
    this.updatedAt = this.updatedAt || new Date()
  }

  static create(values = {}) {
    return new Users(values)
  }
}

module.exports = {
  Users
}
