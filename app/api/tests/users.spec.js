const chai = require('chai')
const sinon = require('sinon')
const User = require('../models/users')
const userModel= require('../../../mocks/mockUsersModel').Users
const userController = require('../controllers/users')
const expect = chai.expect
describe('User Controller', function () {
  let status, json, res
  // eslint-disable-next-line no-undef
  beforeEach(() => {
    status = sinon.stub()
    json = sinon.spy()
    res = { json, status }
    status.returns(res)
  })
  describe('create', function () {
    it('should return created user obj', async function () {
      const req = { body: { name: 'Raushan',
        password: 'test@123',
        email: 'test@gmail.com',
        description: 'test description',
        isReviewer: 'false' } }

      const findStub = sinon.stub(User, 'findOne').returns(Promise.resolve(null))
      const createStub = sinon.stub(User, 'create').returns(Promise.resolve(new userModel()))

      await userController.create(req, res)
      expect(findStub.calledOnce).to.be.true
      expect(createStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(200)
      expect(json.args[0][0].data.name).to.equal('Raushan')
      expect(json.args[0][0].data.email).to.equal('test@gmail.com')
      expect(json.args[0][0].data.password).to.equal('test@123')
      expect(json.args[0][0].data.description).to.equal('test description')
      expect(json.args[0][0].data.isReviewer).to.equal('false')
      expect(json.args[0][0].status).to.equal('success')

      findStub.restore()
      createStub.restore()
    })
    it('should not called create method & return status 422 if the user alreday exists', async function () {
      const req = { body: { name: 'Raushan',
        password: 'test@123',
        email: 'test@gmail.com',
        description: 'test description',
        isReviewer: 'false' } }
      const findStub = sinon.stub(User, 'findOne').returns(Promise.resolve(new userModel()))
      const createStub = sinon.stub(User, 'create').returns(Promise.resolve(new userModel()))

      await userController.create(req, res)
      expect(findStub.calledOnce).to.be.true
      expect(createStub.calledOnce).to.be.false
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(422)
      expect(json.args[0][0].message).to.equal('User Alreday Exists')

      findStub.restore()
      createStub.restore()
    })

    it('should returns status 422 if the invalid user id or password rovided', async function () {
      let bcrypt = {
        compareSync: function(reqPassword, resPassword) {
          return true
        }
      }
      const req = { body: {
        password: 'test@123',
        email: 'test@gmail.com' } }
      const findStub = sinon.stub(User, 'findOne').returns(Promise.resolve(req.body))

      await userController.authenticate(req, res)

      expect(findStub.calledOnce).to.be.true
      expect(status.calledOnce).to.be.true
      expect(status.args[0][0]).to.equal(422)
      expect(json.args[0][0].status).to.equal('error')
      expect(json.args[0][0].message).to.equal('Invalid email/password!!!')
      //expect(stub2.calledOnce).to.be.true
    })
  })
})
