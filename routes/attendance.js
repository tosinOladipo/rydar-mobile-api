const express = require('express');
const router = express.Router();

const attendanceController = require('./../controllers/attendance');

router.route('/')
    .post(attendanceController.postAttendance)
    .get(attendanceController.getCompanyRiderAttendance)

router.route('/:riderId')
    .get(attendanceController.getAttendanceByRiderId)

router.route('/:companyId/rider/:attendanceDate')
    .get(attendanceController.getCompanyRiderAttendance)


module.exports = router;