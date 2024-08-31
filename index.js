import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import usersRoutes from "./routes/users.js";
import salesRoutes from "./routes/sales.js";
import saleDetailsRoutes from "./routes/saleDetails.js";
import productsRoutes from "./routes/products.js";
import customersRoutes from "./routes/customers.js";
import authRoutes from "./routes/authRoutes.js";
import routesRoutes from "./routes/routes.js";
/* import rolesRoutes from "./routes/roles.js";
import trucksRoutes from "./routes/trucks.js";
import userRoutesRoutes from "./routes/userRoutes.js"; */

import swaggerDocs from "./swagger.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// Register routes
app.use("/users", usersRoutes);
app.use("/sales", salesRoutes);
app.use("/sale-details", saleDetailsRoutes);
app.use("/products", productsRoutes);
app.use("/customers", customersRoutes);
app.use("/auth", authRoutes);
app.use("/routes", routesRoutes);
/* app.use("/roles", rolesRoutes);
app.use("/trucks", trucksRoutes);
app.use("/user-routes", userRoutesRoutes); */

swaggerDocs(app);

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening on port ${port}`);
  console.log(`Swagger UI available at http://localhost:${port}/api-docs`);
});
