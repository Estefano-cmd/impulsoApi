import pool from "../config/db.js";

const createUser = async (userData) => {
  const { username, password, state, id_rol, name, surname } = userData;
  const result = await pool.query(
    `INSERT INTO users (username, password, state, id_rol, name, surname) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [username, password, state, id_rol, name, surname]
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

const updateUser = async (id, userData) => {
  const { username, password, state, id_rol, name, surname } = userData;
  const result = await pool.query(
    `UPDATE users SET username = $1, password = $2, state = $3, id_rol = $4, 
     name = $5, surname = $6 WHERE id = $7 RETURNING *`,
    [username, password, state, id_rol, name, surname, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return result.rowCount > 0;
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
