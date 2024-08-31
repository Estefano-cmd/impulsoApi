import express from "express";
import {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  getSalesByRoute,
} from "../controllers/sales.js";

const router = express.Router();

router.post("/", createSale);
router.get("/", getAllSales);
router.get("/:id", getSaleById);
router.patch("/:id", updateSale);
router.delete("/:id", deleteSale);
router.get("/:id_route", getSalesByRoute);

export default router;
