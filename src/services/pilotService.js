const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * @openapi
 * components:
 *   schemas:
 *     Pilot:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: KITW
 *         firstname:
 *           type: string
 *           example: Kira
 *         lastname:
 *           type: string
 *           example: Twinston
 *         gender:
 *           type: string
 *           example: female
 *         dateOfBirth:
 *           type: string
 *           example: 1991-08-13
 *         email:
 *           type: string
 *           example: k.twinston@rotor-manager.com
 *         password:
 *           type: strong
 */
async function readPilots(filterParams) {
    try {
        return await prisma.pilots.findMany({
            where: {
                //ex. organisation
            }
        });
    } catch (error) {
        throw error;
    }
}

async function readPilotById(pilotId) {
    try{
        return await await prisma.pilots.findUniqueOrThrow({
            where: {
                id: pilotId
            }
        });
    } catch (error) {
        throw error;
    }
}

async function createPilot(newPilot) {
    const newPilotToCreate = {
        ...newPilot,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    try{
        return await prisma.pilots.create({
            data: {
                id: newPilotToCreate.id,
                firstname: newPilotToCreate.firstname,
                lastname: newPilotToCreate.lastname,
                gender: newPilotToCreate.gender,
                dateOfBirth: newPilotToCreate.dateOfBirth,
                email: newPilotToCreate.email,
                password: newPilotToCreate.password
            }
        })
    } catch (error){
        return error;
    }
}

async function updatePilot(pilotId, data) {
    try {
        return await prisma.pilots.update({
            where: { id: pilotId },
            data: {
                firstname: data.firstname,
                lastname: data.lastname,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                email: data.email,
                password: data.password
            }
        });
    } catch (error) {
        throw error;
    }
}

async function deletePilot(pilotId) {
    try{
        return await prisma.pilots.delete({
            where: {
                id: pilotId
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    readPilots,
    readPilotById,
    createPilot,
    updatePilot,
    deletePilot
};