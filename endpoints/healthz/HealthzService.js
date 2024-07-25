const mongoose = require('mongoose');

// callback(err, result)
const getDBStatus = (callback) => {
    const readyState = mongoose.connection.readyState;
    const mongoStatus = mongoose.STATES[readyState];
    if(readyState == 1){
        callback(null, mongoStatus)
    } else {
        callback(mongoStatus, null)
    }
}

module.exports = {
	getDBStatus
}