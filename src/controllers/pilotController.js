const pilotService = require("../services/pilotService");
async function readPilots(req, res){
    try{
        const allPilots = await pilotService.readPilots();
        res.json(allPilots);
    } catch (error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function readPilotById (req, res) {
    const {params: { pilotId },
    } = req;
    if (!pilotId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':pilotId' can not be empty" },
            });
    }
    try{
        const pilot = await pilotService.readPilotById(pilotId);
        res.send({ status: "OK", data: pilot });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}

async function createPilot(req, res){
    const { body } = req;
    if (
        !body.firstname ||
        !body.lastname ||
        !body.gender ||
        !body.dateOfBirth ||
        !body.email ||
        !body.password
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                        "One of the following keys is missing or is empty in request body: 'firstname', 'lastname', 'gender', 'dateOfBirth', 'email', 'password'",
                },
            });
        return;
    }
    console.log(body);
    const createNewPilot = {
        firstname: body.firstname,
        lastname: body.lastname,
        gender: body.gender,
        dateOfBirth: body.dateOfBirth,
        email: body.email,
        password: body.password
    };
    try{
        const createdPilot = await pilotService.createPilot(createNewPilot);
        res.status(201).send({ status: "OK", data: createdPilot });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function updatePilot(req, res) {
    const {
        body,
        params: { pilotId },
    } = req;
    if (!pilotId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':aircraftId' can not be empty" },
            });
    }
    try{
        const updatedPilot = await pilotService.updatePilot(pilotId, body);
        res.send({ status: "OK", data: updatedPilot });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function deletePilot(req, res) {
    const {
        params: { pilotId },
    } = req;
    if (!pilotId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':deletePilotById' can not be empty" },
            });
    }
    try {
        await pilotService.deletePilot(pilotId);
        res.status(204).send({ status: "OK"});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}

module.exports = {
    readPilots,
    readPilotById,
    updatePilot,
    createPilot,
    deletePilot
}