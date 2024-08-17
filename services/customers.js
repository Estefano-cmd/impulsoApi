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
    id_user,
    province,
    nit,
    razon_social,
    uv,
  } = customerData;

  const result = await pool.query(
    `INSERT INTO customers (name, surname, phone, ci, business_type, photo_url, 
      address, coord_lat, coord_lng, id_user, province, nit, razon_social, uv) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
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
      id_user,
      province,
      nit,
      razon_social,
      uv,
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
    id_user,
    province,
    nit,
    razon_social,
    uv,
  } = customerData;

  const result = await pool.query(
    `UPDATE customers SET name = $1, surname = $2, phone = $3, ci = $4, 
      business_type = $5, photo_url = $6, address = $7, coord_lat = $8, 
      coord_lng = $9, id_user = $10, province = $11, nit = $12, razon_social = $13, uv = $14 
      WHERE id = $15 RETURNING *`,
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
      id_user,
      province,
      nit,
      razon_social,
      uv,
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
