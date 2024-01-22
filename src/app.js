const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");

const v1AircraftRouter = require("./v1/routes/aircraftRoutes");
const v1PilotRouter = require("./v1/routes/pilotRoutes");
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1/aircraft", v1AircraftRouter);
app.use("/api/v1/pilots", v1PilotRouter);

app.get("/", (req,res) => {
    res.send('Nothing to see here. Use API Url!')
})

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
})

