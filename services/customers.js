import pool from "../config/db.js";

const createCustomer = async (customerData) => {
  const {
    name,
    surname,
    phone,
    ci,
    business_type,
    photo_url,
    address,
    coord_lat,
    coord_lng,
    province,
    nit,
    razon_social,
    id_uv,
  } = customerData;

  const result = await pool.query(
    `INSERT INTO customers (name, surname, phone, ci, business_type, photo_url, 
      address, coord_lat, coord_lng, province, nit, razon_social, id_uv) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
    [
      name,
      surname,
      phone,
      ci,
      business_type,
      photo_url,
      address,
      coord_lat,
      coord_lng,
      province,
      nit,
      razon_social,
      id_uv,
    ]
  );
  return result.rows[0];
};

const getAllCustomers = async () => {
  const result = await pool.query("SELECT * FROM customers");
  return result.rows;
};

const getCustomerById = async (id) => {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const updateCustomer = async (id, customerData) => {
  const {
    name,
    surname,
    phone,
    ci,
    business_type,
    photo_url,
    address,
    coord_lat,
    coord_lng,
    province,
    nit,
    razon_social,
    id_uv,
  } = customerData;

  const result = await pool.query(
    `UPDATE customers SET name = $1, surname = $2, phone = $3, ci = $4, 
      business_type = $5, photo_url = $6, address = $7, coord_lat = $8, 
      coord_lng = $9,  province = $10, nit = $11, razon_social = $12, id_uv = $13 
      WHERE id = $14 RETURNING *`,
    [
      name,
      surname,
      phone,
      ci,
      business_type,
      photo_url,
      address,
      coord_lat,
      coord_lng,
      province,
      nit,
      razon_social,
      id_uv,
      id,
    ]
  );
  return result.rows[0];
};

const deleteCustomer = async (id) => {
  const result = await pool.query("DELETE FROM customers WHERE id = $1", [id]);
  return result.rowCount > 0;
};

export default {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
