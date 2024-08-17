import pool from "../config/db.js";

export const createProduct = async (productData) => {
  const { name, price_city, price_province, stock, price_buy, image_url } =
    productData;
  const result = await pool.query(
    `INSERT INTO products (name, price_city, price_province, stock, price_buy, image_url) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [name, price_city, price_province, stock, price_buy, image_url]
  );
  return result.rows[0];
};

export const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateProduct = async (id, productData) => {
  const { name, price_city, price_province, stock, price_buy, image_url } =
    productData;
  const result = await pool.query(
    `UPDATE products SET name = $1, price_city = $2, price_province = $3, 
     stock = $4, price_buy = $5, image_url = $6 WHERE id = $7 RETURNING *`,
    [name, price_city, price_province, stock, price_buy, image_url, id]
  );
  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
  return result.rowCount > 0;
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
