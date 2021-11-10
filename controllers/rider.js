const Rider = require('./../models/rider');

exports.getAllRiders = async (req, res, next) => {
    const riders = await Rider.find();
    res.status(200).json(riders);
};


exports.postRider = async (req, res, next) => {
    const newRider = new Rider(req.body);
    try {
        const rider = await newRider.save();
        const token = getSignedToken(rider);
        res.status(200).json({ token });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

//Get single rider
exports.getRiderById = async (req, res, next) => {
    const { riderId } = req.params;
    try {
        const rider = await Rider.findById(riderId);
        res.status(200).json(rider);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};



//Get all company riders
exports.getRidersByCompanyId = async (req, res, next) => {
    const { companyId } = req.params;
    try {
        const riders = await Rider.find({ companyID : companyId});
        res.status(200).json(riders);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


exports.updateRider = async (req, res, next) => {
    const { riderId } = req.params;
    try {
        await Rider.findByIdAndUpdate(riderId, req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


exports.deleteRider = async (req, res, next) => {
    const { riderId } = req.params;
    try {
        await Rider.findByIdAndRemove(riderId);
        res.status(200).json({ success: true });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


exports.login = async (req, res, next) => {
    const { phoneNumber, password } = req.body;
    const rider = await Rider.findOne({ phoneNumber });
    if (!rider)
        return res.status(403).json({ error: { message: 'invalid email/password' } });
    const isValid = await rider.isPasswordValid(password);
    if (!isValid)
        return res.status(403).json({ error: { message: 'invalid email/password' } });
        const token = getSignedToken(rider);
    res.status(200).json({ token, rider });
};


getSignedToken = rider => {
    return jwt.sign({
        id: rider._id,
        phoneNumber: rider.phoneNumber,
        firstName: rider.firstName,
        lastName: rider.lastName
    }, process.env.RIDER_SECRET_KEY, { expiresIn: '18h' });
};