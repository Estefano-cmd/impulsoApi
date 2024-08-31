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

const getSalesByRoute = async (id_route) => {
  const result = await pool.query(
    `SELECT * 
       FROM sales s JOIN customers c ON s.id_customer = c.id
       JOIN uvs u ON c.id_uv = u.id
       JOIN route_uvs ru ON ru.id_uv = u.id
       JOIN route r ON r.id = ru.id_route
       WHERE id_truck = $1`,
    [id_route]
  );
  return result.rows;
};

export default {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  getSalesByRoute,
};
