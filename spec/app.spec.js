process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
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
});
