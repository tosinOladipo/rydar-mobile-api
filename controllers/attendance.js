const Attendance = require('./../models/attendance');


exports.postAttendance = async (req, res, next) => {
    const { 
        riderId,
        companyID,
        firstName,
        lastName,
        location,
        attendanceTime,
        attendanceDate
    } = req.body;
    const attendance = await Attendance.findOne({ riderId : riderId , attendanceDate : attendanceDate });
    if (attendance)
        return res.status(403).json({ error: { message: 'You already register' } });
    const newAttendance = new Attendance({ 
        riderId,
        companyID,
        firstName,
        lastName,
        location,
        attendanceTime,
        attendanceDate
     });

    try {
        await newAttendance.save();
        res.status(200).json(attendance);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


exports.getAttendanceByRiderId = async (req, res, next) => {
    const { riderId } = req.params;
    try {
        const attendance = await Attendance.find( { riderId : riderId }).sort( { _id: -1 } );
        res.status(200).json(attendance);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getCompanyRiderAttendance = async (req, res, next) => {
    const { companyId } = req.params;
    const { attendanceDate } = req.params;
    try {
        const attendance = await Attendance.find( { companyID : companyId, attendanceDate : attendanceDate }).sort( { _id: -1 } );
        res.status(200).json(attendance);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


