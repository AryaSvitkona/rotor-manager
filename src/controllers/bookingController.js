const bookingService = require("../services/bookingService");
async function readBookings(req, res){
    const { aircraftId, pilotId } = req.query;
    try{
        const allBookings = await bookingService.readBookings({ aircraftId, pilotId });
        res.json(allBookings);
    } catch (error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function readBooking (req, res) {
    const {params: { bookingId },
    } = req;
    if (!bookingId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':bookingId' can not be empty" },
            });
    }
    try{
        const booking = await bookingService.readBooking(bookingId);
        res.send({ status: "OK", data: booking });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}

async function createBooking(req, res){
    const { body } = req;
    if (
        !body.aircraftId ||
        !body.pilotId ||
        !body.startDateTime ||
        !body.endDateTime
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error:
                        "One of the following keys is missing or is empty in request body: 'aircraftId', 'pilotId', 'startDateTime', 'endDateTime'",
                },
            });
        return;
    }
    const createNewBooking = {
        bookingNumber: body.bookingNumber,
        aircraftId: body.aircraftId,
        pilotId: body.pilotId,
        startDateTime: body.startDateTime,
        endDateTime: body.endDateTime
    };
    try{
        const createdBooking = await bookingService.createBooking(createNewBooking);
        res.status(201).send({ status: "OK", data: createdBooking });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function updateBooking(req, res) {
    const {
        body,
        params: { bookingId },
    } = req;
    if (!bookingId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':bookingId' can not be empty" },
            });
    }
    try{
        const updatedBooking = await bookingService.updateBooking(bookingId, body);
        res.send({ status: "OK", data: updatedBooking });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

async function deleteBooking(req, res) {
    const {
        params: { bookingId },
    } = req;
    if (!bookingId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':bookingId' can not be empty" },
            });
    }
    try {
        await bookingService.deleteBooking(bookingId);
        res.status(204).send({ status: "OK"});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}

module.exports = {
    readBookings,
    readBooking,
    updateBooking,
    createBooking,
    deleteBooking
}