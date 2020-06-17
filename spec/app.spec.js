process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const { expect } = require('chai');
const User = require('../db/user');

const defaults = require('superagent-defaults');
const request2 = defaults(request(app));

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
  describe('/login', () => {
    beforeEach(() => {
      request2
        .post('/login')
        .send({
          email: 'test@test.com',
          password: 'password',
        })
        .expect(200)
        .then(({ body: { token } }) => {
          request2.set('Authorization', `Bearer ${token}`);
        });
    });
    it('POST: responds with the access token when provided with correct email and password', () => {
      return request(app)
        .post('/login')
        .send({
          email: 'test@test.com',
          password: 'password',
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.haveOwnProperty('token');
        });
    });
    it('POST: responds with status 401 and relevant error message when email cannot be found', () => {
      return request(app)
        .post('/login')
        .send({
          email: 'sarah@test.com',
          password: 'password',
        })
        .expect(401)
        .then(({ body }) => {
          expect(body.msg).to.equal('email does not exist');
        });
    });
    it('POST: responds with status 401 and relevant error message when an incorrect password is entered', () => {
      return request(app)
        .post('/login')
        .send({
          email: 'test@test.com',
          password: 'password123',
        })
        .expect(401)
        .then(({ body }) => {
          expect(body.msg).to.equal('invalid password');
        });
    });
    it('GET: responds with status 200 and message to say in the function', () => {
      return request(app)
        .get('/login')
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).to.equal('in get user');
        });
    });
  });
});
