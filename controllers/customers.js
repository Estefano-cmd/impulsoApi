import customerService from "../services/customers.js";
import pool from "../config/db.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - phone
 *         - ci
 *         - business_type
 *         - address
 *         - province
 *         - nit
 *         - razon_social
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the customer
 *         name:
 *           type: string
 *           description: The name of the customer
 *         surname:
 *           type: string
 *           description: The surname of the customer
 *         phone:
 *           type: string
 *           description: The phone number of the customer
 *         ci:
 *           type: string
 *           description: The CI of the customer
 *         business_type:
 *           type: string
 *           description: The type of business of the customer
 *         photo_url:
 *           type: string
 *           description: The URL of the customer's photo
 *         address:
 *           type: string
 *           description: The address of the customer
 *         coord_lat:
 *           type: number
 *           format: float
 *           description: The latitude coordinate of the customer's location
 *         coord_lng:
 *           type: number
 *           format: float
 *           description: The longitude coordinate of the customer's location
 *         id_user:
 *           type: integer
 *           description: The ID of the user associated with the customer
 *         province:
 *           type: boolean
 *           description: Indicates if the customer is located in the province
 *         nit:
 *           type: integer
 *           description: The NIT of the customer
 *         razon_social:
 *           type: string
 *           description: The social reason of the customer
 *         uv:
 *           type: integer
 *           description: The UV of the customer
 *       example:
 *         id: 1
 *         name: Alice
 *         surname: Smith
 *         phone: 123456789
 *         ci: 987654321
 *         business_type: Retail
 *         photo_url: http://example.com/photo.jpg
 *         address: 123 Main St
 *         coord_lat: 37.7749
 *         coord_lng: -122.4194
 *         id_user: 1
 *         province: true
 *         nit: 12345678
 *         razon_social: Example Corp
 *         uv: 10
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Customer created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error
 */

export const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of all customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error
 */
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
export const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alice
 *               surname:
 *                 type: string
 *                 example: Smith
 *               phone:
 *                 type: string
 *                 example: 987654321
 *               ci:
 *                 type: string
 *                 example: 123456789
 *               business_type:
 *                 type: string
 *                 example: Retail
 *               photo_url:
 *                 type: string
 *                 example: http://example.com/photo.jpg
 *               address:
 *                 type: string
 *                 example: 123 Main St
 *               coord_lat:
 *                 type: number
 *                 example: 37.7749
 *               coord_lng:
 *                 type: number
 *                 example: -122.4194
 *               id_user:
 *                 type: integer
 *                 example: 2
 *               province:
 *                 type: boolean
 *                 example: false
 *               nit:
 *                 type: integer
 *                 example: 87654321
 *               razon_social:
 *                 type: string
 *                 example: Example LLC
 *               uv:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
export const updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer(
      req.params.id,
      req.body
    );
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer by ID
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
export const deleteCustomer = async (req, res) => {
  try {
    const result = await customerService.deleteCustomer(req.params.id);
    if (result) {
      res.status(200).json({ message: "Customer deleted" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /customers/route/{id_route}:
 *   get:
 *     summary: Get customers by route
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id_route
 *         required: true
 *         description: Route ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of customers associated with the route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Alice"
 *                   surname:
 *                     type: string
 *                     example: "Smith"
 *                   phone:
 *                     type: string
 *                     example: "123456789"
 *                   ci:
 *                     type: string
 *                     example: "987654321"
 *                   business_type:
 *                     type: string
 *                     example: "Retail"
 *                   address:
 *                     type: string
 *                     example: "123 Main St"
 *                   coord_lat:
 *                     type: number
 *                     example: 37.7749
 *                   coord_lng:
 *                     type: number
 *                     example: -122.4194
 *                   province:
 *                     type: boolean
 *                     example: true
 *                   nit:
 *                     type: integer
 *                     example: 12345678
 *                   razon_social:
 *                     type: string
 *                     example: "Example Corp"
 *                   id_uv:
 *                     type: integer
 *                     example: 10
 *       404:
 *         description: No customers found for this route
 *       500:
 *         description: Internal server error
 */

export const getCustomersByRoute = async (req, res) => {
  const { id_route } = req.params;

  try {
    const result = await pool.query(
      `SELECT c.id, c.name, c.surname, c.phone, c.ci, c.business_type, c.address, 
              c.coord_lat, c.coord_lng, c.province, c.nit, c.razon_social, c.id_uv
       FROM customers c
       JOIN uvs u ON c.id_uv = u.id
       JOIN route_uvs ru ON ru.id_uv = u.id
       WHERE ru.id_route = $1`,
      [id_route]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows);
    } else {
      res
        .status(404)
        .json({ message: "No customers found for this route based on UV" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
