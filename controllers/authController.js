import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import dotenv from "dotenv";

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         username: exampleUser
 *         password: examplePassword
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user and returns a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

dotenv.config();

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por su nombre de usuario
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Crear el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Responder con el token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
