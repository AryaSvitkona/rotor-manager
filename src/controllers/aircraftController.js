const aircraftService = require("../services/aircraftService");
const getAllAircraft = (req, res) => {
    const allAircraft = aircraftService.getAllAircraft();
    res.send({ status: "OK", data: allAircraft });
};

const getAircraftById = (req, res) => {
    const {params: { aircraftId },
    } = req;
    if (!aircraftId) {
        return;
    }
    const aircraft = aircraftService.getAircraftById(aircraftId);
    res.send({ status: "OK", data: aircraft });
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
        return;
    }
    const newAircraft = {
        id: body.id,
        type: body.type,
        manufacturer: body.manufacturer,
        model: body.model,
        body: body.operator
    };
    const createdAircraft = aircraftService.createNewAircraft(newAircraft);
    res.status(201).send({ status: "OK", data: createdAircraft });
};

const updateAircraftById = (req, res) => {
    const {
        body,
        params: { aircraftId },
    } = req;
    if (!aircraftId) {
        return;
    }
    const updatedAircraft = aircraftService.updateAircraftById(aircraftId, body);
    res.send({ status: "OK", data: updatedAircraft });
};

const deleteAircraftById = (req, res) => {
    const {
        params: { aircraftId },
    } = req;
    if (!aircraftId) {
        return;
    }
    aircraftService.deleteAircraftById(aircraftId);
    res.status(204).send({ status: "OK" });
};

module.exports = {
    getAllAircraft,
    getAircraftById,
    createNewAircraft,
    updateAircraftById,
    deleteAircraftById
}