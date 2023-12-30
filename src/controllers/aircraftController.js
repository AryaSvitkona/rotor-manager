const aircraftService = require("../services/aircraftService");
const getAllAircraft = (req, res) => {
    // const type = req.query.type;
    const { type, manufacturer } = req.query;
    try{
        const allAircraft = aircraftService.getAllAircraft({ type, manufacturer });
        res.send({ status: "OK", data: allAircraft });
    } catch (error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAircraftById = (req, res) => {
    const {params: { aircraftId },
    } = req;
    if (!aircraftId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':aircraftId' can not be empty" },
            });
    }
    try{
        const aircraft = aircraftService.getAircraftById(aircraftId);
        res.send({ status: "OK", data: aircraft });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

};

const createNewAircraft = (req, res) => {
    const { body } = req;
    if (
        !body.id ||
        !body.type ||
        !body.manufacturer ||
        !body.model ||
        !body.operator
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                        "One of the following keys is missing or is empty in request body: 'id', 'type', 'manufacturer', 'model', 'operator'",
                },
            });
        return;
    }
    const newAircraft = {
        id: body.id,
        type: body.type,
        manufacturer: body.manufacturer,
        model: body.model,
        body: body.operator
    };
    try{
        const createdAircraft = aircraftService.createNewAircraft(newAircraft);
        res.status(201).send({ status: "OK", data: createdAircraft });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateAircraftById = (req, res) => {
    const {
        body,
        params: { aircraftId },
    } = req;
    if (!aircraftId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':aircraftId' can not be empty" },
            });
    }
    try{
        const updatedAircraft = aircraftService.updateAircraftById(aircraftId, body);
        res.send({ status: "OK", data: updatedAircraft });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteAircraftById = (req, res) => {
    const {
        params: { aircraftId },
    } = req;
    if (!aircraftId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':aircraftId' can not be empty" },
            });
    }
    try {
        aircraftService.deleteAircraftById(aircraftId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

};

module.exports = {
    getAllAircraft,
    getAircraftById,
    createNewAircraft,
    updateAircraftById,
    deleteAircraftById
}