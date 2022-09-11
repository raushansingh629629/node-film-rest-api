const chai = require('chai')
const sinon = require('sinon')
const Film = require('../models/films')
const filmModel= require('../../../mocks/mockFilmsModel').Films
const filmController = require('../controllers/films')
const expect = chai.expect
describe('Film Controller', function () {
  let status, json, res
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    status = sinon.stub()
    json = sinon.spy()
    res = { json, status }
    status.returns(res)
  })
  describe('create film', function () {
    it('should return created film obj', async function () {
      const req = {
        body: {
          name: 'gravity',
          description: 'science & fiction',
          releasedDate: '5-09-1997' ,
          rating: '4',
          review: 'was good',
          country: 'us',
          genre: 'science & fiction',
          photo: 'base64 string',
          reviewerId: '12345'
        }
      }

      const createStub = sinon.stub(Film, 'create').returns(Promise.resolve(new filmModel()))

      await filmController.create(req, res)

      expect(createStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].data.name).to.equal('gravity')
      expect(json.args[0][0].data.description).to.equal('science & fiction')
      expect(json.args[0][0].data.releasedDate).to.equal('5-09-1997')
      expect(json.args[0][0].data.rating).to.equal('4')
      expect(json.args[0][0].data.review).to.equal('was good')
      expect(json.args[0][0].data.country).to.equal('us')
      expect(json.args[0][0].data.genre).to.equal('science & fiction')
      expect(json.args[0][0].status).to.equal('success')

      createStub.restore()
    })
    it('should return status 500 if error occure', async function () {
      const req = {
        body: {
          name: 'gravity',
          description: 'science & fiction',
          releasedDate: '5-09-1997' ,
          rating: '3',
          photo: 'base64 string',
          reviewerId: '12345'
        },
        params: {filmId: 'test12345'}
      }

      const createStub = sinon.stub(Film, 'create').callsFake(() => { throw new Error('internal server error')})

      await filmController.create(req, res)
      expect(createStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(500)
      expect(json.args[0][0].message).to.equal('internal server error')

      createStub.restore()
    })
  })
  describe('update film', function () {
    it('should return status 200 and updated film obj', async function () {
      const req = {
        body: {
          name: 'gravity',
          description: 'science & fiction',
          releasedDate: '5-09-1997' ,
          rating: '3',
          review: 'was bad',
          country: 'india',
          genre: 'science & fiction',
          photo: 'base64 string',
          reviewerId: '12345'
        },
        params: {filmId: 'test12345'}
      }

      const updateStub = sinon.stub(Film, 'findByIdAndUpdate').returns(Promise.resolve(new filmModel(req.body)))

      await filmController.updateById(req, res)
      expect(updateStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].data.films.rating).to.equal('3')
      expect(json.args[0][0].data.films.country).to.equal('india')
      expect(json.args[0][0].data.films.genre).to.equal('science & fiction')
      expect(json.args[0][0].status).to.equal('success')

      updateStub.restore()
    })
    it('update should return status 500 if error occure', async function () {
      const req = {
        body: {
          name: 'gravity',
          description: 'science & fiction',
          releasedDate: '5-09-1997' ,
          rating: '3',
          photo: 'base64 string',
          reviewerId: '12345'
        },
        params: {filmId: 'test12345'}
      }

      const updateStub = sinon.stub(Film, 'findByIdAndUpdate').callsFake(() => { throw new Error('internal server error')})

      await filmController.updateById(req, res)
      expect(updateStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(500)
      expect(json.args[0][0].message).to.equal('internal server error')

      updateStub.restore()
    })
    it('update should return status 404 if record not find', async function () {
      const req = {
        body: {
          name: 'gravity',
          description: 'science & fiction',
          releasedDate: '5-09-1997' ,
          rating: '3',
          photo: 'base64 string',
          reviewerId: '12345'
        },
        params: {filmId: 'test12345'}
      }

      const updateStub = sinon.stub(Film, 'findByIdAndUpdate').returns(Promise.resolve(null))

      await filmController.updateById(req, res)
      expect(updateStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(404)
      expect(json.args[0][0].message).to.equal('Not found')

      updateStub.restore()
    })
  })
  describe('list and getById film', function () {
    it('getById controller should return the film object based on provided film id', async function () {
      const req = {
        params: {filmId: 'test12345'}
      }

      const getByIdStub = sinon.stub(Film, 'findById').returns(Promise.resolve(new filmModel()))

      await filmController.show(req, res)
      expect(getByIdStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].data.films.rating).to.equal('4')
      expect(json.args[0][0].data.films.country).to.equal('us')
      expect(json.args[0][0].data.films.genre).to.equal('science & fiction')
      expect(json.args[0][0].status).to.equal('success')

      getByIdStub.restore()
    })
    it('list controller should return the all existing film records', async function () {
      const req = {
      }

      const findStub = sinon.stub(Film, 'find').returns(Promise.resolve([new filmModel()]))

      await filmController.list(req, res)
      expect(findStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].data.films[0].rating).to.equal('4')
      expect(json.args[0][0].data.films[0].country).to.equal('us')
      expect(json.args[0][0].data.films[0].genre).to.equal('science & fiction')
      expect(json.args[0][0].status).to.equal('success')

      findStub.restore()
    })
    it('getById controller should returns 500 status if error occured', async function () {
      const req = {
        params: {filmId: 'test12345'}
      }

      const getByIdStub = sinon.stub(Film, 'findById').callsFake(() => { throw new Error('internal server error')})

      await filmController.show(req, res)
      expect(getByIdStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(500)
      expect(json.args[0][0].message).to.equal('internal server error')

      getByIdStub.restore()
    })
    it('getById controller should return status 404 if record not find', async function () {
      const req = {
        params: {filmId: 'test12345'}
      }

      const getByIdStub = sinon.stub(Film, 'findById').returns(Promise.resolve(null))

      await filmController.show(req, res)
      expect(getByIdStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(404)
      expect(json.args[0][0].message).to.equal('Not found')

      getByIdStub.restore()
    })
  })
  describe('delete by id film', function () {
    it('delete controller should delete the film based on provided id', async function () {
      const req = {
        params: {filmId: 'test12345'}
      }

      const removedStub = sinon.stub(Film, 'findByIdAndRemove').returns(Promise.resolve(new filmModel()))

      await filmController.deleteById(req, res)
      expect(removedStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].data.films.rating).to.equal('4')
      expect(json.args[0][0].data.films.country).to.equal('us')
      expect(json.args[0][0].data.films.genre).to.equal('science & fiction')
      expect(json.args[0][0].status).to.equal('success')

      removedStub.restore()
    })
    it('delete controller should returns 500 status if error occured', async function () {
      const req = {
        params: {filmId: 'test12345'}
      }

      const removedStub = sinon.stub(Film, 'findByIdAndRemove').callsFake(() => { throw new Error('internal server error')})

      await filmController.deleteById(req, res)
      expect(removedStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(500)
      expect(json.args[0][0].message).to.equal('internal server error')

      removedStub.restore()
    })
    it('delete controller should return status 404 if record not find', async function () {
      const req = {
        params: {filmId: 'test12345'}
      }

      const removedStub = sinon.stub(Film, 'findByIdAndRemove').returns(Promise.resolve(null))

      await filmController.deleteById(req, res)
      expect(removedStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(404)
      expect(json.args[0][0].message).to.equal('Not found')

      removedStub.restore()
    })
  })
})
