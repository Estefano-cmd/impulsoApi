import pool from "../config/db.js";

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
 * /routes/{id}/routes:
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
 * /routes/{id}/routes/{id_route}:
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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - state
 *         - id_rol
 *         - name
 *         - surname
 *         - role_type
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user
 *         username:
 *           type: string
 *           description: The unique username of the user
 *         password:
 *           type: string
 *           description: The user's password
 *         state:
 *           type: boolean
 *           description: Whether the user is active or not
 *         id_rol:
 *           type: integer
 *           description: The role ID associated with the user
 *         name:
 *           type: string
 *           description: The first name of the user
 *         surname:
 *           type: string
 *           description: The last name of the user
 *         role_type:
 *           type: string
 *           enum: [distribuidor, preventista, oficina]
 *           description: The role type of the user
 *       example:
 *         id: 1
 *         username: johndoe
 *         password: password123
 *         state: true
 *         id_rol: 2
 *         name: John
 *         surname: Doe
 *         role_type: distribuidor
 *
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
 *           description: An optional description of the route
 *       example:
 *         id: 1
 *         name: Route 1
 *         description: "This is route 1"
 *
 *     UV:
 *       type: object
 *       required:
 *         - uv
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the UV
 *         uv:
 *           type: integer
 *           description: The unique UV number
 *       example:
 *         id: 1
 *         uv: 101
 *
 *     UserRoute:
 *       type: object
 *       required:
 *         - id_user
 *         - id_route
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the user-route relationship
 *         id_user:
 *           type: integer
 *           description: The ID of the user
 *         id_route:
 *           type: integer
 *           description: The ID of the route
 *       example:
 *         id: 1
 *         id_user: 1
 *         id_route: 1
 *
 *     RouteUV:
 *       type: object
 *       required:
 *         - id_route
 *         - id_uv
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the route-UV relationship
 *         id_route:
 *           type: integer
 *           description: The ID of the route
 *         id_uv:
 *           type: integer
 *           description: The ID of the UV
 *       example:
 *         id: 1
 *         id_route: 1
 *         id_uv: 1
 *
 * /routes/{id}/routes:
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
 *                 description: The ID of the route to assign to the user
 *                 example: 1
 *     responses:
 *       200:
 *         description: Route assigned to the user successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRoute'
 *       500:
 *         description: Internal server error
 *
 * /routes/{id}/routes/{id_route}:
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
 *
 * /routes/{id}/routes/detail:
 *   get:
 *     summary: Get the details of the route assigned to a user
 *     tags: [UserRoutes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Route details with name and UVs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 route_name:
 *                   type: string
 *                   description: The name of the route
 *                 uvs:
 *                   type: array
 *                   items:
 *                     type: integer
 *       404:
 *         description: Route details not found
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

export const getRouteDetailFromUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
        r.name AS route_name,
        r.description AS route_description,
        json_agg(u.uv) AS uvs
      FROM user_routes ur
      JOIN routes r ON ur.id_route = r.id
      JOIN route_uvs ru ON ru.id_route = r.id
      JOIN uvs u ON u.id = ru.id_uv
      WHERE ur.id_user = $1
      GROUP BY r.name, r.description`,
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res
        .status(404)
        .json({ message: "Route details not found for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
