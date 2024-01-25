const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/**
 * @openapi
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         booking_number:
 *           type: integer
 *           example: 100001
 *         aircraftId:
 *           type: string
 *           example: HB-ABC
 *         pilotId:
 *           type: string
 *           example: STRU
 *           description: ID of Pilot in command
 *         gender:
 *           type: string
 *           example: female
 *         startDateTime:
 *           type: string
 *           format: date-time
 *           example: 2024-01-25T19:20:08.347Z
 *         endDateTime:
 *           type: string
 *           format: date-time
 *           example: 2024-01-25T19:20:08.347Z
 */
async function readBookings(filterParams) {
    try {
        return await prisma.bookings.findMany({
            where: {
                aircraftId: filterParams?.aircraftId,
                pilotId: filterParams?.pilotId,

            }
        });
    } catch (error) {
        throw error;
    }
}

async function readBooking(bookingNumber) {
    try{
        return await prisma.bookings.findUniqueOrThrow({
            where: {
                bookingNumber: bookingNumber
            }
        });
    } catch (error) {
        throw error;
    }
}

async function createBooking(newBooking) {
    const newBookingToCreate = {
        ...newBooking,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    try{
        return await prisma.bookings.create({
            data: {
                bookingNumber: newBookingToCreate.bookingNumber,
                aircraftId: newBookingToCreate.aircraftId,
                pilotId: newBookingToCreate.pilotId,
                startDateTime: newBookingToCreate.startDateTime,
                endDateTime: newBookingToCreate.endDateTime
            }
        })
    } catch (error){
        return error;
    }
}

async function updateBooking(bookingId, data) {
    try {
        return await prisma.bookings.update({
            where: { id: bookingId },
            data: {
                aircraftId: data.aircraftId,
                pilotId: data.pilotId,
                startDateTime: data.startDateTime,
                endDateTime: data.endDateTime
            }
        });
    } catch (error) {
        throw error;
    }
}

async function deleteBooking(bookingId) {
    try{
        return await prisma.bookings.delete({
            where: {
                id: bookingId
            }
        });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    readBookings,
    readBooking,
    createBooking,
    updateBooking,
    deleteBooking
};