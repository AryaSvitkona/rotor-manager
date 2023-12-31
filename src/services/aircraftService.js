const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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