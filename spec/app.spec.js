process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const { expect } = require('chai');
const User = require('../db/user');

describe('/', () => {
  after(async () => {
    await User.deleteMany();
  });

  describe('/signup', () => {
    it('POST: returns 201 status code and successfully adds new user to the database', () => {
      return request(app)
        .post('/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(201);
    });
  });
  describe('/signup - errors', () => {
    it('POST: returns status code 400 and the relevant error message when an attempt to sign up with an already stored email address', () => {
      return request(app)
        .post('/signup')
        .send({ email: 'test@test.com', password: 'password' })
        .expect(400)
        .then((error) => {
          expect(error.body.msg).to.equal('email already exists!');
        });
    });
    it('POST: return status code ... and the relevant error message when an attempt to sign up without the required information', () => {
      return request(app).post('/signup').send({}).expect(500);
    });
    it('status: 405', () => {
      const invalidMethods = ['patch', 'put', 'get', 'delete'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/signup')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
