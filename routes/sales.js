import express from "express";
import {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  getSalesByRoute,
  getSalesByUser,
} from "../controllers/sales.js";

const router = express.Router();

router.post("/", createSale);
router.get("/", getAllSales);
router.get("/:id", getSaleById);
router.patch("/:id", updateSale);
router.delete("/:id", deleteSale);
router.get("/route/:id_route", getSalesByRoute);
router.get("/user/:id_user", getSalesByUser);

export default router;
