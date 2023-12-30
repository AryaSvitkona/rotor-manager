const aircraftTable = require("../database/aircraft");

const getAllAircraft = (filterParams) => {
    try{
        return aircraftTable.getAllAircraft(filterParams);
    } catch (error) {
        throw error;
    }

};

const getAircraftById = (aircraftId) => {
    try{
        return aircraftTable.getAircraftById(aircraftId);
    } catch (error) {
        throw error;
    }
};

const createNewAircraft = (newAircraft) => {
    const newAircraftToCreate = {
        ...newAircraft,
        createdAt: new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" }),
        updatedAt: new Date().toLocaleString("de-CH", { timeZone: "Europe/Zurich" })
    }
    try{
    return aircraftTable.createNewAircraft(newAircraftToCreate);
    } catch (error){
        return error;
    }
};

const updateAircraftById = (aircraftId, data) => {
    try {
        return aircraftTable.updateAircraftById(aircraftId, data);
    } catch (error) {
        throw error;
    }
};

const deleteAircraftById = (aircraftId) => {
    try {
        return aircraftTable.deleteAircraftById(aircraftId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllAircraft,
    getAircraftById,
    createNewAircraft,
    updateAircraftById,
    deleteAircraftById,
};