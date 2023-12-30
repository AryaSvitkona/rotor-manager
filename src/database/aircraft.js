const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllAircraft = (filterParams) => {
    try {
        const aircraft = DB.aircraft;
        if (filterParams.type) {
            return DB.aircraft.filter((aircraft) =>
                aircraft.type.toLowerCase().includes(filterParams.type)
            );
        }
        if (filterParams.manufacturer) {
            return DB.aircraft.filter((aircraft) =>
                aircraft.manufacturer.toLowerCase().includes(filterParams.manufacturer)
            );
        }
        return aircraft;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getAircraftById = (aircraftId) => {
    try {
        const aircraft = DB.aircraft.find((aircraft) => aircraft.id === aircraftId);
        if (!aircraft) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${aircraftId}'`,
            };
        }
        return aircraft;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }

}

const createNewAircraft = (newAircraft) => {
    try {
        const isAlreadyAdded = DB.aircraft.findIndex((aircraft) => aircraft.id === newAircraft.id) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Aircraft with the ID '${newAircraft.id}' already exists`,
            };
        }

        DB.aircraft.push(newAircraft);
        saveToDatabase(DB);
        return newAircraft;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const updateAircraftById = (aircraftId, data) => {
    try {
        /* TODO Preventing aircraftId form being updated */
        const indexForUpdate = DB.aircraft.findIndex(
            (aircraft) => aircraft.id === aircraftId
        );
        if (indexForUpdate === -1) {
            return;
        }
        const updatedAircraft = {
            ...DB.aircraft[indexForUpdate],
            ...data,
            updatedAt: new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" }),
        };
        DB.aircraft[indexForUpdate] = updatedAircraft;
        saveToDatabase(DB);
        return updatedAircraft;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }

};

const deleteAircraftById = (aircraftId) => {
    try {
        const indexForDeletion = DB.aircraft.findIndex(
            (aircraft) => aircraft.id === aircraftId
        );
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${aircraftId}'`,
            };
        }
        DB.aircraft.splice(indexForDeletion, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }

};

module.exports = {
    getAllAircraft,
    getAircraftById,
    createNewAircraft,
    updateAircraftById,
    deleteAircraftById
};