const chai = require('chai')
const sinon = require('sinon')
const Comment = require('../models/comments')
const commentModel= require('../../../mocks/mockCommentsModel').Comment
const commentController = require('../controllers/comments')
const expect = chai.expect
describe('Comment Controller', function () {
  let status, json, res
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    status = sinon.stub()
    json = sinon.spy()
    res = { json, status }
    status.returns(res)
  })
  describe('Test Create Comment Feature', function () {
    it('should return created comment data based on provided filmId & userId', async function () {
      const req = {
        body: {
          filmId: '53b1c579bdf3de74f76bdac9',
          userId: '53b1c579bdf3de74f76bfd48',
          comment: 'This is test comment'
        }
      }

      const createStub = sinon.stub(Comment, 'create').returns(Promise.resolve(new commentModel()))

      await commentController.create(req, res)
      expect(createStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].status).to.equal('success')
      expect(json.args[0][0].message).to.equal('Comment added successfully!!!')
      expect(json.args[0][0].data.comment).to.equal('This is test comment')

      createStub.restore()
    })
    it('should return status 500 if error occure', async function () {
      const req = {
        body: {
          filmId: '53b1c579bdf3de74f76bdac9',
          userId: '53b1c579bdf3de74f76bfd48',
          comment: 'This is test comment'
        }
      }

      const createStub = sinon.stub(Comment, 'create').callsFake(() => { throw new Error('internal server error')})

      await commentController.create(req, res)
      expect(createStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(500)
      expect(json.args[0][0].message).to.equal('internal server error')

      createStub.restore()
    })
    it('should return status 422 if the invalid userId or filmId is provided', async function () {
      const req = {
        body: {
          filmId: 'test123',
          userId: '53b1c579bdf3de74f76bfd48',
          comment: 'This is test comment'
        }
      }

      const createStub = sinon.stub(Comment, 'create').returns(Promise.resolve(new commentModel(req.body)))

      await commentController.create(req, res)
      expect(createStub.calledOnce).to.be.false
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(422)
      expect(json.args[0][0].message).to.equal('Invalid filmId or userId is provided')

      createStub.restore()
    })
  })
  describe('Test Update Comment Feature', function () {
    it('Update comment should return updated comment data based on provided comment id', async function () {
      const req = {
        body: {
          comment: 'This is updated test comment'
        },
        params: {commentId: 'test123'}
      }

      const updateStub = sinon.stub(Comment, 'findByIdAndUpdate').returns(Promise.resolve(req.body))

      await commentController.updateById(req, res)

      expect(updateStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].status).to.equal('success')
      expect(json.args[0][0].message).to.equal('Comment updated successfully!!!')
      expect(json.args[0][0].data.comment).to.equal('This is updated test comment')

      updateStub.restore()
    })
    it('Update comment should return status 500 if error occure', async function () {
      const req = {
        body: {
          comment: 'This is test comment'
        },
        params: {commentId: 'test123'}
      }

      const updateStub = sinon.stub(Comment, 'findByIdAndUpdate').callsFake(() => { throw new Error('internal server error')})

      await commentController.updateById(req, res)
      expect(updateStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(500)
      expect(json.args[0][0].message).to.equal('internal server error')

      updateStub.restore()
    })
    it('Update comment should return status 404 if the comment not found', async function () {
      const req = {
        body: {
          comment: 'This is test comment'
        },
        params: {commentId: 'test123'}
      }

      const updateStub = sinon.stub(Comment, 'findByIdAndUpdate').returns(Promise.resolve(null))

      await commentController.updateById(req, res)
      expect(updateStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(404)
      expect(json.args[0][0].message).to.equal('Not found')

      updateStub.restore()
    })
  })
  describe('Test list & getById Comment Feature', function () {
    it('should return comment data based on provided comment id', async function () {
      const req = {
        params: {commentId: 'test123'}
      }

      const findByIdStub = sinon.stub(Comment, 'findById').returns(Promise.resolve(new commentModel()))

      await commentController.getById(req, res)
      expect(findByIdStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].status).to.equal('success')
      expect(json.args[0][0].data.comment).to.equal('This is test comment')
      expect(json.args[0][0].data.filmId).to.equal('53b1c579bdf3de74f76bdac9')
      expect(json.args[0][0].data.userId).to.equal('53b1c579bdf3de74f76bfd48')

      findByIdStub.restore()
    })
    it('should list the comment data', async function () {
      const req = {
      }

      const findStub = sinon.stub(Comment, 'find').returns(Promise.resolve([new commentModel()]))

      await commentController.getAll(req, res)
      expect(findStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].status).to.equal('success')
      expect(json.args[0][0].message).to.equal('Comment list found!!!')
      expect(json.args[0][0].data.length).to.equal(1)

      findStub.restore()
    })
    it('should return status 500 if the error occure while fetching the data', async function () {
      const req = {
        params: {commentId: 'test123'}
      }

      const findByIdStub = sinon.stub(Comment, 'findById').callsFake(() => { throw new Error('internal server error')})

      await commentController.getById(req, res)
      expect(findByIdStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(500)
      expect(json.args[0][0].message).to.equal('internal server error')

      findByIdStub.restore()
    })
    it('Get by id comment should return status 404 if the comment not found', async function () {
      const req = {
        params: {commentId: 'test123'}
      }

      const findByIdStub = sinon.stub(Comment, 'findById').returns(Promise.resolve(null))

      await commentController.getById(req, res)
      expect(findByIdStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(404)
      expect(json.args[0][0].message).to.equal('Not found')

      findByIdStub.restore()
    })
  })
  describe('Delete Comment Feature', function () {
    it('should return deleted comment data based on provided comment id', async function () {
      const req = {
        params: {commentId: 'test123'}
      }

      const removeStub = sinon.stub(Comment, 'findByIdAndRemove').returns(Promise.resolve(new commentModel()))

      await commentController.deleteById(req, res)
      expect(removeStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].status).to.equal('success')
      expect(json.args[0][0].data.comment).to.equal('This is test comment')
      expect(json.args[0][0].data.filmId).to.equal('53b1c579bdf3de74f76bdac9')
      expect(json.args[0][0].data.userId).to.equal('53b1c579bdf3de74f76bfd48')

      removeStub.restore()
    })
    it('should return status 500 if the error occured while deleteing the comment', async function () {
      const req = {
        params: {commentId: 'test123'}
      }

      const removeStub = sinon.stub(Comment, 'findByIdAndRemove').callsFake(() => { throw new Error('internal server error')})

      await commentController.deleteById(req, res)
      expect(removeStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(500)
      expect(json.args[0][0].message).to.equal('internal server error')

      removeStub.restore()
    })
    it('Delete by id comment should return status 404 if the comment not found', async function () {
      const req = {
        params: {commentId: 'test123'}
      }

      const removeStub = sinon.stub(Comment, 'findByIdAndRemove').returns(Promise.resolve(null))

      await commentController.deleteById(req, res)
      expect(removeStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(404)
      expect(json.args[0][0].message).to.equal('Not found')

      removeStub.restore()
    })
  })
})
