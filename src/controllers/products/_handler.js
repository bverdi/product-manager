const productController = require('./product.controller');


const createProductRoute = async (event) => {
  return await productController.createProduct(event);
};

const getProductListRoute = async () => {
  return await productController.getProducts();
};

const getProductByIdRoute = async (event) => {
  return await productController.getProductById(event);
};

const editProductRoute = async (event) => {
  return await productController.editProduct(event);
};

const deleteProductRoute = async (event) => {
  return await productController.deleteProduct(event);
};

module.exports = {
  createProductRoute,
  getProductListRoute,
  getProductByIdRoute,
  editProductRoute,
  deleteProductRoute
};
