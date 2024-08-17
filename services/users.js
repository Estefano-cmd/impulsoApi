import pool from "../config/db.js";
import bcrypt from "bcryptjs";

const createUser = async (userData) => {
  const { username, password, state, id_rol, name, surname, role_type } =
    userData;

  // Encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await pool.query(
    `INSERT INTO users (username, password, state, id_rol, name, surname, role_type) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [username, hashedPassword, state, id_rol, name, surname, role_type]
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
  const { username, password, state, id_rol, name, surname, role_type } =
    userData;

  // Encriptar la nueva contraseña antes de actualizar
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await pool.query(
    `UPDATE users SET username = $1, password = $2, state = $3, id_rol = $4, 
     name = $5, surname = $6, role_type = $7 WHERE id = $8 RETURNING *`,
    [username, hashedPassword, state, id_rol, name, surname, role_type, id]
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
