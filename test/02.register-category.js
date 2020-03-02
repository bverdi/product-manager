'use strict';

//
// dependencias
const chai = require('chai');

//
// running local
if (process.env.NODE_ENV === 'local') {
  const path = require('path');
  var dotEnvPath = path.resolve('.env');
  require('dotenv').config({ path: dotEnvPath });
}

//
// controller
const handler = require('../src/controllers/categories/_handler');

describe('01 Test Case Register a category to endpoint /categories', () => {
  it('Should register a category', (done) => {
    const event = {
      body: {code: 'Code 1', name: 'Category 1'}
    };
    handler.createCategoryRoute(event, {})
      .then(res => {
        const body = JSON.parse(res.body);
        chai.expect(res.statusCode).eq(201);
        chai.expect(body).to.be.an('object', 'Your body is not an object!');
        done();
      })
      .catch(err => {
        return done(err);
      });
  });

  it('Should throw an error when your body is invalid.', (done) => {
    const event = {
      body: {code: null, name: 'Category 1'}
    };
    handler.createProductRoute(event, {})
      .then(res => {
        chai.expect(res.statusCode).eq(400);
        done();
      })
      .catch(err => {
        return done(err);
      });
  });
});