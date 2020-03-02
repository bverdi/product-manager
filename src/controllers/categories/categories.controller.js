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

const _createResponse = (body, statusCode, headers) => {
  const mergeHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Cache-Control': 'private, max-age=0, no-cache, no-store, must-revalidate',
    'Content-Type': 'application/json; charset=utf-8',
    ...headers, 
  };
  return {
    statusCode,
    headers: mergeHeaders,
    body: JSON.stringify(body)
  };
};

const _returnSucess = function (body, statusCode = 200, headers = {}) {
  return _createResponse(body, statusCode, headers);
};

const createCategory = async (event) => {
  console.info('START - CREATE CATEGORY');
  const postBody = JSON.parse(event.body);
  const code = postBody.code;
  const name = postBody.name;


  try {
    await dbAccess.registerCategory(code, name);
    console.info('Category created');
    return _returnSucess('Category created', 201);
  }
  catch (error) {
    console.error('Error when trying create a category');
    throw new Error(error);
  }
};


const editCategory = async (event) => {
  console.info('START - EDIT CATEGORY');
  const postBody = JSON.parse(event.body);
  const id = event.pathParameters.id;
  const code = postBody.code;
  const name = postBody.name;
  
  try {
    await dbAccess.editCategory(code, name, id);
    console.info('Category edited');
    return _returnSucess('Category edited', 200);
  }
  catch (error) {
    console.error('Error when trying editing a category');
    throw new Error(error);
  }
};

const getCategories = async () => {
  console.info('START - GET CATEGORY LIST');
  try {
    const categories = await dbAccess.getCategories();
    console.info('Category/categories obtained');
    const returnBody = {
      categories: categories
    };
    return _returnSucess(returnBody, 200);
  }
  catch (error) {
    console.error('Error when trying gettint all category/categories');
    throw new Error(error);
  }
};

const getCategoriesByIds = async (event) => {
  console.info('START - GET CATEGORY BY ID');
  const postBody = JSON.parse(event.body);
  const ids = postBody.ids;
  try {
    const categories = await dbAccess.getCategoriesByIds(ids);
    console.info('Category obtained');
    const returnBody = {
      category: categories
    };
    return _returnSucess(returnBody, 201);
  }
  catch (error) {
    console.error('Error when trying getting a category');
    throw new Error(error);
  }
};

const deleteCategory = async(event) => {
  console.info('START - DELETE CATEGORY');
  const id = event.pathParameters.id;
  try {
    await dbAccess.deleteCategory(id);
    console.info('Category deleted');
    return _returnSucess('Category deleted', 201);
  }
  catch (error) {
    console.error('Error when trying to delete the category');
    throw new Error(error);
  }
};



module.exports = {
  createCategory,
  editCategory,
  getCategories,
  getCategoriesByIds,
  deleteCategory
};