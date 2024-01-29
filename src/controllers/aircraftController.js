const aircraftService = require("../services/aircraftService");
async function getAllAircraft(req, res){
    // const type = req.query.type;
    const { type, manufacturer } = req.query;
    try{
        const allAircraft = await aircraftService.getAllAircraft({ type, manufacturer });
        res.json(allAircraft);
    } catch (error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function getAircraftById (req, res) {
    const {params: { aircraftId },
    } = req;
    if (!aircraftId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter '{aircraftId}' can not be empty" },
            });
    }
    try{
        const aircraft = await aircraftService.getAircraftById(aircraftId);
        res.send({ status: "OK", data: aircraft });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}

async function createNewAircraft(req, res){
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
        operator: body.operator
    };
    try{
        const createdAircraft = await aircraftService.createNewAircraft(newAircraft);
        res.status(201).send({ status: "OK", data: createdAircraft });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function updateAircraftById(req, res) {
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
        const updatedAircraft = await aircraftService.updateAircraftById(aircraftId, body);
        res.send({ status: "OK", data: updatedAircraft });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function deleteAircraftById(req, res) {
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
        await aircraftService.deleteAircraftById(aircraftId);
        res.status(204).send({ status: "DELETED", data: { aircraftId: aircraftId} });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}

module.exports = {
    getAllAircraft,
    getAircraftById,
    createNewAircraft,
    updateAircraftById,
    deleteAircraftById
}