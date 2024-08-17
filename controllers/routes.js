import pool from "../config/db";

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the route
 *         name:
 *           type: string
 *           description: The name of the route
 *         description:
 *           type: string
 *           description: A description of the route
 *       example:
 *         id: 1
 *         name: Route 1
 *         description: Main route for deliveries
 */

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: Route created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: List of all routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Get route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Route ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Route details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /routes/{id}:
 *   put:
 *     summary: Update route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Route ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: Route updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Delete route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Route ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}/routes:
 *   post:
 *     summary: Assign a route to a user
 *     tags: [UserRoutes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_route:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Route assigned to user
 *       404:
 *         description: User or route not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/{id}/routes/{id_route}:
 *   delete:
 *     summary: Remove a route from a user
 *     tags: [UserRoutes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_route
 *         required: true
 *         description: Route ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Route removed from user
 *       404:
 *         description: User or route not found
 *       500:
 *         description: Internal server error
 */

export const createRoute = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO routes (name, description) VALUES ($1, $2) RETURNING *`,
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllRoutes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM routes");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRouteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM routes WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Route not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateRoute = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      `UPDATE routes SET name = $1, description = $2 WHERE id = $3 RETURNING *`,
      [name, description, id]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Route not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM routes WHERE id = $1", [id]);
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Route deleted" });
    } else {
      res.status(404).json({ message: "Route not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const assignRouteToUser = async (req, res) => {
  const { id } = req.params;
  const { id_route } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO user_routes (id_user, id_route) VALUES ($1, $2) RETURNING *`,
      [id, id_route]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeRouteFromUser = async (req, res) => {
  const { id, id_route } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM user_routes WHERE id_user = $1 AND id_route = $2`,
      [id, id_route]
    );
    if (result.rowCount > 0) {
      res.status(200).json({ message: "Route removed from user" });
    } else {
      res.status(404).json({ message: "User or route not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
