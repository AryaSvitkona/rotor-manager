const aircraftTable = require("../database/aircraft");

const getAllAircraft = () => {
    const allAircraft = aircraftTable.getAllAircraft();
    return allAircraft;
};

const getAircraftById = (aircraftId) => {
    return aircraftTable.getAircraftById(aircraftId);
};

const createNewAircraft = (newAircraft) => {
    const newAircraftToCreate = {
        ...newAircraft,
        createdAt: new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" }),
        updatedAt: new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" })
    }
    return aircraftTable.createNewAircraft(newAircraftToCreate);
};

const updateAircraftById = (aircraftId, data) => {
    return aircraftTable.updateAircraftById(aircraftId, data);
};

const deleteAircraftById = (aircraftId) => {
    return aircraftTable.deleteAircraftById(aircraftId);
};

module.exports = {
    getAllAircraft,
    getAircraftById,
    createNewAircraft,
    updateAircraftById,
    deleteAircraftById,
};