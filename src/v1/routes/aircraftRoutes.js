const express = require('express');
const aircraftController = require("../../controllers/aircraftController");
const bookingController = require("../../controllers/bookingController");
const router = express.Router();

router.get( '/', aircraftController.getAllAircraft);

router.get('/:aircraftId', aircraftController.getAircraftById);

router.get('/:aircraftId/booking', bookingController.getBookingForAircraft);

router.post('/', aircraftController.createNewAircraft);

router.patch('/:aircraftId', aircraftController.updateAircraftById);

router.delete('/:aircraftId', aircraftController.deleteAircraftById);

module.exports = router;