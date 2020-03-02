/* eslint-disable no-undef */
'use strict';

//
// dependencies
//
// helpers

//
// services
const dbAccess = require('../../services/queries');
//
// const

//
// private

const createProduct = async (event) => {
  console.info('START - CREATE PRODUCT');
  const postBody = JSON.parse(event.body);
  const name         = postBody.name;
  const sku          = postBody.sku;
  const price        = postBody.price;
  const description  = postBody.description;
  const quantity     = postBody.quantity;
  const categories   = postBody.category || null;
  const imageProduct = postBody.imageProduct || null;

  const categoriesAux = await dbAccess.getCategoriesByIds(categories);
  try {
    if(categories.length == categoriesAux.length){
      await dbAccess.registerProduct(name, sku, price, description, quantity, categories, imageProduct);
      return console.info('Product created');
    }
    else {
      await dbAccess.registerProduct(name, sku, price, description, quantity, null, imageProduct);
      return console.info('Product created');
    }
  }
  catch (error) {
    console.error('Error when trying create a product');
    throw new Error(error);
  }
};

const getProducts = async () => {
  console.info('START - GET PRODUCT LIST');
  try {
    const products = await dbAccess.getProducts();
    console.info('Product list obtained');
    return products;
  }
  catch (error) {
    console.error('Error when trying to get the product list');
    throw new Error(error);
  }
};

const getProductById = async(event) => {
  console.info('START - GET PRODUCT BY ID');
  const id = event.pathParameters.id;
  try {
    const products = await dbAccess.getProductById(id);
    console.info('Product obtained');
    return products;
  }
  catch (error) {
    console.error('Error when trying to get the product');
    throw new Error(error);
  }
};

const editProduct = async (event) => {
  log('START - EDIT PRODUCT');
  const id           = event.pathParameters.id;
  const postBody = JSON.parse(event.body);
  const name         = postBody.name;
  const sku          = postBody.sku;
  const price        = postBody.price;
  const description  = postBody.description;
  const quantity     = postBody.quantity;
  const categories   = postBody.category;
  const imageProduct = postBody.imageProduct;

  try {
    await dbAccess.editProduct(name, sku, price, description, quantity, categories, imageProduct, id);
    return console.info('Product edited');
  }
  catch (error) {
    console.error('Error when trying editing a product');
    throw new Error(error);
  }
};

const deleteProduct = async(event) => {
  console.info('START - DELETE PRODUCT');
  const id = event.pathParameters.id;
  try {
    await dbAccess.deleteProduct(id);
    return console.info('Product obtained');
  }
  catch (error) {
    console.error('Error when trying to delete the product');
    throw new Error(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct
};