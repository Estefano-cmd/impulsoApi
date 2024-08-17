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
} from "../controllers/routes";

const router = express.Router();

// Route endpoints
router.post("/routes", createRoute);
router.get("/routes", getAllRoutes);
router.get("/routes/:id", getRouteById);
router.put("/routes/:id", updateRoute);
router.delete("/routes/:id", deleteRoute);

// User route assignment endpoints
router.post("/users/:id/routes", assignRouteToUser);
router.delete("/users/:id/routes/:id_route", removeRouteFromUser);

export default router;
