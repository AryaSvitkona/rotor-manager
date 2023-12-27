const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllAircraft = () => {
    return DB.aircraft;
};

const getAircraftById = (aircraftId) => {
    const aircraft = DB.aircraft.find((aircraft) => aircraft.id === aircraftId);
    if (!aircraft) {
        return;
    }
    return aircraft;
}

const createNewAircraft = (newAircraft) => {
    const isAlreadyAdded = DB.aircraft.findIndex((aircraft) => aircraft.id === newAircraft.id) > -1;
    if (isAlreadyAdded) {
        return;
    }
    DB.aircraft.push(newAircraft);
    saveToDatabase(DB);
    return newAircraft;
};

const updateAircraftById = (aircraftId, data) => {
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
};

const deleteAircraftById = (aircraftId) => {
    const indexForDeletion = DB.aircraft.findIndex(
        (aircraft) => aircraft.id === aircraftId
    );
    if (indexForDeletion === -1) {
        return;
    }
    DB.aircraft.splice(indexForDeletion, 1);
    saveToDatabase(DB);
};

module.exports = {
    getAllAircraft,
    getAircraftById,
    createNewAircraft,
    updateAircraftById,
    deleteAircraftById
};