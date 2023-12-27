const express = require('express');
const aircraftController = require("../../controllers/aircraftController");
const router = express.Router();

router.get( '/', aircraftController.getAllAircraft);

router.get('/:aircraftId', aircraftController.getAircraftById);

router.post('/', aircraftController.createNewAircraft);

router.patch('/:aircraftId', aircraftController.updateAircraftById);

router.delete('/:aircraftId', aircraftController.deleteAircraftById);

module.exports = router;