import express from "express";
import {
  createSaleDetail,
  getAllSaleDetails,
  getSaleDetailById,
  updateSaleDetail,
  deleteSaleDetail,
} from "../controllers/saleDetails.js";

const router = express.Router();

router.post("/saleDetail", createSaleDetail);
router.get("/saleDetail", getAllSaleDetails);
router.get("/saleDetail/:id", getSaleDetailById);
router.put("/saleDetail/:id", updateSaleDetail);
router.delete("/saleDetail/:id", deleteSaleDetail);

export default router;
