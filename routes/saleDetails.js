import express from "express";
import {
  createSaleDetail,
  getAllSaleDetails,
  getSaleDetailById,
  updateSaleDetail,
  deleteSaleDetail,
} from "../controllers/saleDetails.js";

const router = express.Router();

router.post("", createSaleDetail);
router.get("/", getAllSaleDetails);
router.get("/:id", getSaleDetailById);
router.put("/:id", updateSaleDetail);
router.delete("/:id", deleteSaleDetail);

export default router;
