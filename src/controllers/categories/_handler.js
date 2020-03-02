const categoryController = require('./categories.controller');


const createCategoryRoute = async (event) => {
  return await categoryController.createCategory(event);
};

const getCategoriesRoute = async () => {
  return await categoryController.getCategories();
};

const getCategoryByIdRoute = async (event) => {
  return await categoryController.getCategoriesByIds(event);
};

const editCategoryRoute = async (event) => {
  return await categoryController.editCategory(event);
};

const deleteCategoryRoute = async (event) => {
  return await categoryController.deleteCategory(event);
};

module.exports = {
  createCategoryRoute,
  getCategoriesRoute,
  getCategoryByIdRoute,
  editCategoryRoute,
  deleteCategoryRoute
};
