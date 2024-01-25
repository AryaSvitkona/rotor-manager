const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "Rotor Manager API", version: "1.0.0" },
        components: {},


    },
    apis: [
        "./src/v1/routes/aircraftRoutes.js",
        "./src/v1/routes/pilotRoutes.js",
        "./src/v1/routes/bookingRoutes.js",
        "./src/services/aircraftService.js",
        "./src/services/pilotService.js",
        "./src/services/bookingService.js"
    ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
};

module.exports = { swaggerDocs };