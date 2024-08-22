// swagger.js
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const serverUrl = process.env.SERVER_URL || "http://localhost:3000"; // Usa la variable de entorno o localhost

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Impulso API",
      version: "1.0.0",
      description: "A simple Express API",
    },
    servers: [
      {
        url: serverUrl, // URL dinámica dependiendo del entorno
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
  },
  apis: ["./controllers/**/*.js"], // Ruta a la documentación de la API
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger UI available at ${serverUrl}/api-docs`);
};

export default swaggerDocs;
