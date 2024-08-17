const pool = require("../config/db");

exports.createRole = async (roleData) => {
  const { name } = roleData;
  const result = await pool.query(
    "INSERT INTO roles (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

exports.getAllRoles = async () => {
  const result = await pool.query("SELECT * FROM roles");
  return result.rows;
};

exports.getRoleById = async (id) => {
  const result = await pool.query("SELECT * FROM roles WHERE id = $1", [id]);
  return result.rows[0];
};

exports.updateRole = async (id, roleData) => {
  const { name } = roleData;
  const result = await pool.query(
    "UPDATE roles SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
};

exports.deleteRole = async (id) => {
  const result = await pool.query("DELETE FROM roles WHERE id = $1", [id]);
  return result.rowCount > 0;
};
