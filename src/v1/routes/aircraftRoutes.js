const express = require('express');
const aircraftController = require("../../controllers/aircraftController");
const bookingController = require("../../controllers/bookingController");
const router = express.Router();

/**
 * @openapi
 * /api/v1/aircraft:
 *   get:
 *     tags:
 *       - Aircraft
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         example: turbine
 *         description: The engine type of the aircraft
 *       - in: query
 *         name: manufacturer
 *         schema:
 *           type: string
 *         example: Robinson
 *         description: The manufacturer name of the aircraft
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Aircraft'
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 */
router.get( '/', aircraftController.getAllAircraft);

router.get('/:aircraftId', aircraftController.getAircraftById);

router.get('/:aircraftId/booking', bookingController.getBookingForAircraft);

router.post('/', aircraftController.createNewAircraft);

router.patch('/:aircraftId', aircraftController.updateAircraftById);

router.delete('/:aircraftId', aircraftController.deleteAircraftById);

module.exports = router;