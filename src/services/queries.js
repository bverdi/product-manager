const pmDB = require('./access');

const registerProduct = async (name, sku, price, description, quantity, categories, imageProduct) => {
  const consulta = `INSERT INTO products (name, sku, price, description, quantity, categories, image_product) 
                    VALUES($1, $2, $3, $4, $5, $6, $7);`;
  
  const values = [name, sku, price, description, quantity, categories, imageProduct];
  return await pmDB.executeQuery(consulta, values);
};

const getProducts = async () => {
  const consulta = 'SELECT * from products';
  return await pmDB.executeQuery(consulta);
};

const getProductById = async (id) => {
  const consulta = 'SELECT * from products where id = $1';
  const values = [id];
  return await pmDB.executeQuery(consulta, values);
};

const editProduct = async (name, sku, price, description, quantity, categories, imageProduct, id) => {
  const consulta = `UPDATE products (name, sku, price, description, quantity, categories, image_product) 
  SET name = '$1', sku = '$2', price = $3, description = '$4', quantity = $5, categories = $6, image_product = '$7';
  WHERE id = $8`;

  const values = [name, sku, price, description, quantity, categories, imageProduct, id];
  return await pmDB.executeQuery(consulta, values);
};

const deleteProduct = async (id) => {
  const consulta = 'DELETE FROM products WHERE id = $1;';
  const values = [id];
  return await pmDB.executeQuery(consulta, values);
};

const registerCategory = async (code, name) => {
  const consulta = `INSERT INTO categories (code, name) 
  VALUES($1, $2);`;

  const values = [code, name];
  return await pmDB.executeQuery(consulta, values);
};

const getCategories = async () => {
  const consulta = 'SELECT * from categories';
  return await pmDB.executeQuery(consulta);
};

const getCategoriesByIds = async (ids) => {
  let stringAux = '';
  for (const id of ids) {
    stringAux = '\'' + `${id}` + '\''+ ',' + stringAux;
  }
  stringAux = stringAux.substring(0, stringAux.length-1);
  const consulta = `SELECT * from categories where name in (${stringAux}) or code in (${stringAux})`;
  return await pmDB.executeQuery(consulta);
};

const editCategory = async (code, name, id) => {
  const consulta = 'UPDATE categories SET code = $1, name = $2 WHERE id = $3';
  const values = [code, name, id];
  return await pmDB.executeQuery(consulta, values);
};

const deleteCategory = async (id) => {
  const consulta = 'DELETE FROM categories WHERE id = $1;';
  const values = [id];
  return await pmDB.executeQuery(consulta, values);
};

module.exports = {
  registerProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  registerCategory,
  getCategories,
  getCategoriesByIds,
  editCategory,
  deleteCategory
};


