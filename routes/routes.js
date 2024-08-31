// routes/routes.js
import express from "express";
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
  assignRouteToUser,
  removeRouteFromUser,
  getRouteDetailFromUser,
} from "../controllers/routes.js";

const router = express.Router();

// Route endpoints
router.post("/", createRoute);
router.get("/", getAllRoutes);
router.get("/:id", getRouteById);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

// User route assignment endpoints
router.post("/:id/routes", assignRouteToUser);
router.delete("/:id/routes/:id_route", removeRouteFromUser);
router.get("/:id/routes/detail", getRouteDetailFromUser);

export default router;
