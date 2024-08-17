import pool from "../config/db.js";

const createSaleDetail = async (saleDetailData) => {
  const { id_sale, id_product, quantity, price } = saleDetailData;
  const result = await pool.query(
    `INSERT INTO sale_details (id_sale, id_product, quantity, price) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [id_sale, id_product, quantity, price]
  );
  return result.rows[0];
};

const getAllSaleDetails = async () => {
  const result = await pool.query("SELECT * FROM sale_details");
  return result.rows;
};

const getSaleDetailById = async (id) => {
  const result = await pool.query("SELECT * FROM sale_details WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

const updateSaleDetail = async (id, saleDetailData) => {
  const { id_sale, id_product, quantity, price } = saleDetailData;
  const result = await pool.query(
    `UPDATE sale_details SET id_sale = $1, id_product = $2, quantity = $3, price = $4 
     WHERE id = $5 RETURNING *`,
    [id_sale, id_product, quantity, price, id]
  );
  return result.rows[0];
};

const deleteSaleDetail = async (id) => {
  const result = await pool.query("DELETE FROM sale_details WHERE id = $1", [
    id,
  ]);
  return result.rowCount > 0;
};

export default {
  createSaleDetail,
  getAllSaleDetails,
  getSaleDetailById,
  updateSaleDetail,
  deleteSaleDetail,
};
