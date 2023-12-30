const bookingService = require("../services/bookingService");

const getBookingForAircraft = (req, res) => {
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
        const aircraft = bookingService.getBookingsForAircraft(aircraftId);
        res.send({ status: "OK", data: aircraft });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }

};

module.exports = { getBookingForAircraft };