const DB = require("./db.json");

const getBookingsForAircraft = (aircraftId) => {
    try {
        const booking = DB.bookings.filter((booking) => booking.aircraft === aircraftId);
        if (!booking) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${aircraftId}'`,
            };
        }
        return booking;

    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = { getBookingsForAircraft };