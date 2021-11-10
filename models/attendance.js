const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({

    //attendance information
    riderId:  { type: String, required: true },
    companyID:  { type: String, required: true },
    firstName:  { type: String, required: true },
    lastName:  { type: String, required: true },
    location: { type: String, required: true },
    attendanceTime: { type: String, required: true },
    attendanceDate: { type: String, required: true },
    attendanceMonthYear: { type: String },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('attendance', attendanceSchema);