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
  });
  describe('/user', () => {
    it('GET: responds with status code 200 and the users email when authenticated', () => {
      return request2
        .get('/user')
        .expect(200)
        .then(({ body }) => {
          expect(body.msg).to.equal('User email: test@test.com');
        });
    });
    it('GET: responds with status code 401 and relevant message when authorization has not occurred', () => {
      return request2
        .get('/user')
        .set('Authorization', '')
        .expect(401)
        .then(({ body }) => {
          expect(body.msg).to.equal('You must be logged in');
        });
    });
  });
  describe('/tracks', () => {
    it('GET: returns status code 200 and the information about stored tracks', () => {
      return request2
        .get('/tracks')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('array');
        });
    });
    it('GET: responds with status code 401 and relevant message when authorization has not occurred', () => {
      return request2
        .get('/tracks')
        .set('Authorization', '')
        .expect(401)
        .then(({ body }) => {
          expect(body.msg).to.equal('You must be logged in');
        });
    });
    it('POST: responds with status 201 and information about the track posted', () => {
      return request2
        .post('/tracks')
        .send({
          name: "Sarah's track",
          locations: [
            {
              timestamp: 1234,
              coords: {
                latitude: 8773,
                longitude: 8554,
                altitude: 3836,
                accuracy: 90,
                heading: 567,
                speed: 3,
              },
            },
          ],
        })
        .expect(201)
        .then(({ body }) => {
          expect(body).to.be.an('object');
          expect(body).to.include.keys('name', 'userId', 'locations');
        });
    });
  });
});
