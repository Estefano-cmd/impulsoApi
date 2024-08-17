import pool from "../config/db.js";

const createSale = async (saleData) => {
  const { state, total, id_customer, id_distributor, id_seller, id_truck } =
    saleData;
  const result = await pool.query(
    `INSERT INTO sales (state, total, id_customer, id_distributor, id_seller, id_truck) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [state, total, id_customer, id_distributor, id_seller, id_truck]
  );
  return result.rows[0];
};

const getAllSales = async () => {
  const result = await pool.query("SELECT * FROM sales");
  return result.rows;
};

const getSaleById = async (id) => {
  const result = await pool.query("SELECT * FROM sales WHERE id = $1", [id]);
  return result.rows[0];
};

const updateSale = async (id, saleData) => {
  const { state, total, id_customer, id_distributor, id_seller, id_truck } =
    saleData;
  const result = await pool.query(
    `UPDATE sales SET state = $1, total = $2, id_customer = $3, 
     id_distributor = $4, id_seller = $5, id_truck = $6 WHERE id = $7 RETURNING *`,
    [state, total, id_customer, id_distributor, id_seller, id_truck, id]
  );
  return result.rows[0];
};

const deleteSale = async (id) => {
  const result = await pool.query("DELETE FROM sales WHERE id = $1", [id]);
  return result.rowCount > 0;
};

export default {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
