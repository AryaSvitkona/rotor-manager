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

/**
 * @openapi
 * /api/v1/aircraft/:aircraftId:
 *   get:
 *     tags:
 *       - Aircraft
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
 *                   type: object
 *                   $ref: '#/components/schemas/Aircraft'
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
router.get('/:aircraftId', aircraftController.getAircraftById);

/**
 * @openapi
 * /api/v1/aircraft/:
 *   post:
 *     tags:
 *       - Aircraft
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
 *                   type: object
 *                   $ref: '#/components/schemas/Aircraft'
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
router.post('/', aircraftController.createNewAircraft);

/**
 * @openapi
 * /api/v1/aircraft/:aircraftId:
 *   patch:
 *     tags:
 *       - Aircraft
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
 *                   type: object
 *                   $ref: '#/components/schemas/Aircraft'
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
router.patch('/:aircraftId', aircraftController.updateAircraftById);

/**
 * @openapi
 * /api/v1/aircraft/:aircraftId:
 *   delete:
 *     tags:
 *       - Aircraft
 *     responses:
 *       204:
 *         description: OK
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
router.delete('/:aircraftId', aircraftController.deleteAircraftById);

module.exports = router;