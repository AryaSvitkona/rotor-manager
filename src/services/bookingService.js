const booking = require("../database/booking");

const getBookingsForAircraft = (aircraftId) => {
    try {
        return booking.getBookingsForAircraft(aircraftId);
    } catch (error) {
        throw error;
    }
};
module.exports = { getBookingsForAircraft };