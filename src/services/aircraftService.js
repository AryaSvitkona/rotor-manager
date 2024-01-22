const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * @openapi
 * components:
 *   schemas:
 *     Aircraft:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: HB-ABC
 *         type:
 *           type: string
 *           example: Turbine
 *         manufacturer:
 *           type: string
 *           example: Robinson
 *         equipment:
 *           type: string
 *           example: R66
 *         operator:
 *           type: string
 *           example: Foobar GmbH
 *         passenger:
 *           type: int
 *           example: 5
 *         specs:
 *           type: array
 *           items:
 *             type: string
 *           example: ["huge performance", "affordable hour rate", "turbine"]
 *         createdAt:
 *           type: string
 *           example: 8.12.2023, 10:29:00
 *         updatedAt:
 *           type: string
 *           example: 27.12.2023, 12:10:20
 */
async function getAllAircraft(filterParams) {
    try {
        return await prisma.aircraft.findMany({
            where: {
                type: filterParams.type,
                manufacturer: filterParams.manufacturer
            }
        });
    } catch (error) {
        throw error;
    }
}

async function getAircraftById(aircraftId) {
    try{
        return await await prisma.aircraft.findUniqueOrThrow({
            where: {
                id: aircraftId
            }
        });
    } catch (error) {
        throw error;
    }
}

async function createNewAircraft(newAircraft) {
    const newAircraftToCreate = {
        ...newAircraft,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    try{
    return await prisma.aircraft.create({
        data: {
            id: newAircraftToCreate.id,
            type: newAircraftToCreate.type,
            manufacturer: newAircraftToCreate.manufacturer,
            model: newAircraftToCreate.model,
            operator: newAircraftToCreate.operator,
            passenger: newAircraftToCreate.passenger,
            createdAt: newAircraftToCreate.createdAt,
            updatedAt: newAircraftToCreate.updatedAt,
            specs: newAircraftToCreate.specs
        }
    })
    } catch (error){
        return error;
    }
}

async function updateAircraftById(aircraftId, data) {
    try {
        return await prisma.aircraft.update({
            where: { id: aircraftId },
            data: {
                type: data.type,
                manufacturer: data.manufacturer,
                model: data.model,
                operator: data.operator,
                passenger: data.passenger,
                updatedAt: new Date(),
                specs: data.specs
            }
        });
    } catch (error) {
        throw error;
    }
}

async function deleteAircraftById(aircraftId) {
    try{
        return await prisma.aircraft.delete({
            where: {
                id: aircraftId
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllAircraft,
    getAircraftById,
    createNewAircraft,
    updateAircraftById,
    deleteAircraftById
};