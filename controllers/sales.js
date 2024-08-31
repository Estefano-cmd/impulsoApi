import saleService from "../services/sales.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Sale:
 *       type: object
 *       required:
 *         - sale_date
 *         - state
 *         - total
 *         - id_customer
 *         - id_distributor
 *         - id_seller
 *         - id_truck
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the sale
 *         sale_date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the sale was made
 *         state:
 *           type: string
 *           description: The state of the sale (e.g., completed, pending)
 *         total:
 *           type: number
 *           format: float
 *           description: The total amount of the sale
 *         id_customer:
 *           type: integer
 *           description: The ID of the customer who made the sale
 *         id_distributor:
 *           type: integer
 *           description: The ID of the distributor associated with the sale (optional)
 *         id_seller:
 *           type: string
 *           description: The username of the seller who made the sale
 *         id_truck:
 *           type: integer
 *           description: The ID of the truck used for the sale (optional)
 *       example:
 *         id: 1
 *         sale_date: 2024-08-16T00:00:00Z
 *         state: completed
 *         total: 200.50
 *         id_customer: 1
 *         id_distributor: 2
 *         id_seller: johndoe
 *         id_truck: 1
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       201:
 *         description: Sale created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Internal server error
 */

export const createSale = async (req, res) => {
  try {
    const sale = await saleService.createSale(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     responses:
 *       200:
 *         description: List of all sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Internal server error
 */
export const getAllSales = async (req, res) => {
  try {
    const sales = await saleService.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sale ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Internal server error
 */
export const getSaleById = async (req, res) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sales/{id}:
 *   patch:
 *     summary: Update sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sale ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sale_date:
 *                 type: string
 *                 format: date-time
 *                 example: 2024-08-16T00:00:00Z
 *               state:
 *                 type: string
 *                 example: completed
 *               total:
 *                 type: number
 *                 example: 210.00
 *               id_customer:
 *                 type: integer
 *                 example: 1
 *               id_distributor:
 *                 type: integer
 *                 example: 2
 *               id_seller:
 *                 type: string
 *                 example: janedoe
 *               id_truck:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Sale updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Internal server error
 */
export const updateSale = async (req, res) => {
  try {
    const sale = await saleService.updateSale(req.params.id, req.body);
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Delete sale by ID
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sale ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Internal server error
 */
export const deleteSale = async (req, res) => {
  try {
    const result = await saleService.deleteSale(req.params.id);
    if (result) {
      res.status(200).json({ message: "Sale deleted" });
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sales/route/{id_route}:
 *   get:
 *     summary: Get sales associated with a specific route
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id_route
 *         required: true
 *         description: The ID of the route to get sales for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of sales associated with the specified route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the sale
 *                   sale_date:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the sale was made
 *                   state:
 *                     type: string
 *                     description: The state of the sale (e.g., completed, pending)
 *                   total:
 *                     type: number
 *                     format: float
 *                     description: The total amount of the sale
 *                   id_customer:
 *                     type: integer
 *                     description: The ID of the customer who made the sale
 *                   id_distributor:
 *                     type: integer
 *                     description: The ID of the distributor associated with the sale (optional)
 *                   id_seller:
 *                     type: string
 *                     description: The username of the seller who made the sale
 *                   id_truck:
 *                     type: integer
 *                     description: The ID of the truck used for the sale (optional)
 *                   customer:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: The name of the customer
 *                       surname:
 *                         type: string
 *                         description: The surname of the customer
 *                       phone:
 *                         type: string
 *                         description: The phone number of the customer
 *                       ci:
 *                         type: string
 *                         description: The CI (identity card) of the customer
 *                       business_type:
 *                         type: string
 *                         description: The type of business of the customer
 *                       address:
 *                         type: string
 *                         description: The address of the customer
 *                       coord_lat:
 *                         type: number
 *                         description: The latitude coordinate of the customer's address
 *                       coord_lng:
 *                         type: number
 *                         description: The longitude coordinate of the customer's address
 *                       province:
 *                         type: boolean
 *                         description: Indicates if the customer is from the province
 *                       nit:
 *                         type: integer
 *                         description: The NIT (Tax Identification Number) of the customer
 *                       razon_social:
 *                         type: string
 *                         description: The social reason of the customer
 *                       uv:
 *                         type: integer
 *                         description: The UV associated with the customer
 *                   sale_details:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the sale detail
 *                         id_sale:
 *                           type: integer
 *                           description: The ID of the sale to which this detail belongs
 *                         id_product:
 *                           type: integer
 *                           description: The ID of the product being sold
 *                         quantity:
 *                           type: integer
 *                           description: The quantity of the product sold
 *                         price:
 *                           type: number
 *                           format: float
 *                           description: The price of the product in this sale
 *       404:
 *         description: No sales found for this route
 *       500:
 *         description: Internal server error
 */

export const getSalesByRoute = async (req, res) => {
  try {
    const sale = await saleService.getSalesByRoute(req.params.id_route);
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: "Sales not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
