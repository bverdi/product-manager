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
const handler = require('../src/controllers/products/_handler');

describe('01 Test Case Register a product to endpoint /products', () => {
  it('Should register a product', (done) => {
    const event = {
      body: {name: 'Eplerenone', sku: '42254-011', description: 'Bypass Innominate Artery to Bilateral Upper Leg Artery with Synthetic Substitute, Open Approach', quantity: '59', price: '2300.39', category: ['Categoria Nova', 'Categoria Editada'], imageProduct: 'www.google.com.br'}
    };
    handler.createProductRoute(event, {})
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
      body: {name: null, sku: '42254-011', description: 'Bypass Innominate Artery to Bilateral Upper Leg Artery with Synthetic Substitute, Open Approach', quantity: '59', price: '2300.39', category: ['Categoria Nova', 'Categoria Editada'], imageProduct: 'www.google.com.br'}
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