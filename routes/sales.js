import express from "express";
import {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} from "../controllers/sales.js";

const router = express.Router();

router.post("/sale", createSale);
router.get("/sale", getAllSales);
router.get("/sale/:id", getSaleById);
router.put("/sale/:id", updateSale);
router.delete("/sale/:id", deleteSale);

export default router;
