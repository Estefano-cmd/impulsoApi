import saleDetailService from "../services/sale_details.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     SaleDetail:
 *       type: object
 *       required:
 *         - id_sale
 *         - id_product
 *         - quantity
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the sale detail
 *         id_sale:
 *           type: integer
 *           description: The ID of the sale to which this detail belongs
 *         id_product:
 *           type: integer
 *           description: The ID of the product being sold
 *         quantity:
 *           type: integer
 *           description: The quantity of the product sold
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product in this sale
 *       example:
 *         id: 1
 *         id_sale: 1
 *         id_product: 2
 *         quantity: 10
 *         price: 100.00
 */

/**
 * @swagger
 * /sale_details:
 *   post:
 *     summary: Create a new sale detail
 *     tags: [SaleDetails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SaleDetail'
 *     responses:
 *       201:
 *         description: Sale detail created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleDetail'
 *       500:
 *         description: Internal server error
 */

export const createSaleDetail = async (req, res) => {
  try {
    const saleDetail = await saleDetailService.createSaleDetail(req.body);
    res.status(201).json(saleDetail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sale_details:
 *   get:
 *     summary: Get all sale details
 *     tags: [SaleDetails]
 *     responses:
 *       200:
 *         description: List of all sale details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SaleDetail'
 *       500:
 *         description: Internal server error
 */
export const getAllSaleDetails = async (req, res) => {
  try {
    const saleDetails = await saleDetailService.getAllSaleDetails();
    res.status(200).json(saleDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sale_details/{id}:
 *   get:
 *     summary: Get sale detail by ID
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sale Detail ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale detail details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleDetail'
 *       404:
 *         description: Sale detail not found
 *       500:
 *         description: Internal server error
 */
export const getSaleDetailById = async (req, res) => {
  try {
    const saleDetail = await saleDetailService.getSaleDetailById(req.params.id);
    if (saleDetail) {
      res.status(200).json(saleDetail);
    } else {
      res.status(404).json({ message: "Sale detail not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sale_details/{id}:
 *   put:
 *     summary: Update sale detail by ID
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sale Detail ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_sale:
 *                 type: integer
 *                 example: 1
 *               id_product:
 *                 type: integer
 *                 example: 2
 *               quantity:
 *                 type: integer
 *                 example: 15
 *               price:
 *                 type: number
 *                 example: 150.00
 *     responses:
 *       200:
 *         description: Sale detail updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleDetail'
 *       404:
 *         description: Sale detail not found
 *       500:
 *         description: Internal server error
 */
export const updateSaleDetail = async (req, res) => {
  try {
    const saleDetail = await saleDetailService.updateSaleDetail(
      req.params.id,
      req.body
    );
    if (saleDetail) {
      res.status(200).json(saleDetail);
    } else {
      res.status(404).json({ message: "Sale detail not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @swagger
 * /sale_details/{id}:
 *   delete:
 *     summary: Delete sale detail by ID
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Sale Detail ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale detail deleted successfully
 *       404:
 *         description: Sale detail not found
 *       500:
 *         description: Internal server error
 */
export const deleteSaleDetail = async (req, res) => {
  try {
    const result = await saleDetailService.deleteSaleDetail(req.params.id);
    if (result) {
      res.status(200).json({ message: "Sale detail deleted" });
    } else {
      res.status(404).json({ message: "Sale detail not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
