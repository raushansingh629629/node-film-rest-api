'use strict'

const _ = require('lodash')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class MockSchema {
  constructor(values) {
    // const properties = _.without(Object.keys(values), 'id')
    const properties = _.without(Object.keys(values))

    for (const property of properties) {
      this[property] = values[property]
    }
  }

  // get id() {
  //   if (this._id !== null || this._id !== undefined) {
  //     return this._id.toString()
  //   }
  // }

  get _doc() {
    const myProperties = Object.keys(this)
    return myProperties.reduce((obj, property) => {
      obj[property] = this[property]
      return obj
    }, {})
  }

  static get schema() {
    const self = this

    const _flattenKeys = (obj, path = []) => {
      if (!_.isObjectLike(obj)) {
        return { [path.join('.')]: obj }
      } else if (obj instanceof ObjectId) {
        return { [path.join('.')]: obj.toString() }
      } else {
        return _.reduce(obj, (cum, next, key) => _.merge(cum, _flattenKeys(next, [...path, key])), {})
      }
    }

    return {
      eachPath: function(f) {
        const defaultInstance = new self()
        const flattened = _flattenKeys(defaultInstance)
        const propertyPaths = Object.keys(flattened)

        propertyPaths.forEach( path => f(path))
      }
    }
  }

  async save() {
    return this
  }

  markModified() {
  }

  /*
    toJSON are hook methods called by JSON.stringify if present.  They are to return
    a value that in turn is to be converted to a JSON object.
  */
  toJSON() {
    return this.toObject()
  }

  toObject() {
    const myObject = this._doc
    myObject.id = this.id  //provide the string representation

    return _.cloneDeepWith(myObject, value => {
      if (value instanceof MockSchema) {
        return value.toObject()
      } else if (_.isArray(value)) {
        return value.map(e => {
          if (e instanceof MockSchema) {
            return e.toObject()
          } else {
            return _.cloneDeep(e)
          }
        })
      }
    })  //make sure to return undefined here if we don't want to clone ourself.
  }

  // Every implmentation extending from this class should override this method
  static async create() {
    return Promise.resolve()
  }

  //These methods would be your typical candidates for stubbing/mocking
  static async exec() {
    return Promise.resolve()
  }

  static deleteMany() {
    return this
  }
  static deleteOne() {
    return this
  }
  static distinct() {
    return this
  }
  static aggregate(pipeline) {
    return { _pipeline: pipeline, exec: this.exec}
  }
  static find() {
    return this
  }
  static findById() {
    return this
  }
  static findByIdAndRemove() {
    return this
  }
  static findOne() {
    return this
  }
  static findOneAndUpdate() {
    return this
  }
  static limit() {
    return this
  }
  static remove() {
    return this
  }
  static skip() {
    return this
  }
  static sort() {
    return this
  }
  static update() {
    return this
  }
  static updateMany() {
    return this
  }
  static updateOne() {
    return this
  }
}
