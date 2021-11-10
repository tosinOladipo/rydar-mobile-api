const Shipment = require('./../models/shipment');

exports.getAllShipments = async (req, res, next) => {
    const shipments = await Shipment.find().sort( { _id: -1 } );
    res.status(200).json(shipments);
};

exports.getPendingShipments = async (req, res, next) => {
    const { riderId } = req.params;
    const tripStatus  = "pending"
    try {
        const shipment = await Shipment.find({ riderId: riderId , tripStatus: tripStatus });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getAllPendingShipments = async (req, res, next) => {
    const tripStatus  = "pending"
    try {
        const shipment = await Shipment.find({ tripStatus: tripStatus });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getCompanyPendingShipments = async (req, res, next) => {
    const { companyId } = req.params;
    const tripStatus  = "pending"
    try {
        const shipment = await Shipment.find({ companyID: companyId , tripStatus: tripStatus });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getCurrentShipment = async (req, res, next) => {
    const { riderId } = req.params;
    const tripStatus  = "started"
    try {
        const shipment = await Shipment.findOne({ riderId: riderId , tripStatus: tripStatus });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getStartedShipments = async (req, res, next) => {
    const { riderId } = req.params;
    const tripStatus  = "started"
    try {
        const shipment = await Shipment.find({ riderId: riderId , tripStatus: tripStatus });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getAllStartedShipments = async (req, res, next) => {
    const tripStatus  = "started"
    try {
        const shipment = await Shipment.find({ tripStatus: tripStatus });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getCompanyStartedShipments = async (req, res, next) => {
    const { companyId } = req.params;
    const tripStatus  = "started"
    try {
        const shipment = await Shipment.find({ companyID: companyId , tripStatus: tripStatus });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getCompletedShipments = async (req, res, next) => {
    const { riderId } = req.params;
    const tripStatus  = "completed"
    try {
        const shipment = await Shipment.find({ riderId: riderId , tripStatus: tripStatus }).sort( { _id: -1 } );
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getAllCompletedShipments = async (req, res, next) => {
    const tripStatus  = "completed"
    try {
        const shipment = await Shipment.find({ tripStatus: tripStatus }).sort( { _id: -1 } );
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getCompanyCompletedShipments = async (req, res, next) => {
    const { companyId } = req.params;
    const tripStatus  = "completed"
    try {
        const shipment = await Shipment.find({ companyID: companyId , tripStatus: tripStatus }).sort( { _id: -1 } );
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getRiderShipments = async (req, res, next) => {
    const { riderId } = req.params;
    try {
        const shipment = await Shipment.find({ riderId: riderId }).sort( { _id: -1 } );
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


exports.getRiderMonthlyShipments = async (req, res, next) => {
    const { riderId } = req.params;
    const { tripMonth } = req.params;
    const { tripYear } = req.params;
    try {
        const shipment = await Shipment.find({ riderId: riderId, tripMonth: tripMonth, tripYear: tripYear });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


exports.getCompanyMonthlyShipments = async (req, res, next) => {
    const { companyId } = req.params;
    const { tripMonth } = req.params;
    const { tripYear } = req.params;
    try {
        const shipment = await Shipment.find({ companyId: companyId, tripMonth: tripMonth, tripYear: tripYear });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};



exports.postShipment = async (req, res, next) => {
    const newShipment = new Shipment(req.body);
    try {
        const shipment = await newShipment.save();
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getShipmentById = async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const shipment = await Shipment.findOne( { orderId : orderId });
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};



exports.startShipment = async (req, res, next) => {
    const { riderId } = req.params;
    const { orderId } = req.params;
    const shipment = await Shipment.findOne({ riderId : riderId , tripStatus : "started" });
    if (shipment)
        return res.status(403).json({ error: { message: 'You already started a trip' } });
    try {
        const shipment = await Shipment.findOneAndUpdate(
            { orderId : orderId },  // <-- find stage
    { $set: {
       tripStatus: req.body.tripStatus    
      } 
    }   
        );
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.updateShipment = async (req, res, next) => {
    const { orderId } = req.params;
    const { 
        riderId,
        riderPhoneNumber,
        companyID,
        firstName,
        lastName,
        companyName,
        customerName,
        customerPhoneNumber,
        tripType,
        destination,
        customerPackage,
        tripStatus
    } = req.body;
    try {
        const shipment = await Shipment.findOneAndUpdate(
            { orderId : orderId },  // <-- find stage
    { $set: {
        riderId: riderId,
        riderPhoneNumber: riderPhoneNumber,
        companyID: companyID,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        customerName: customerName,
        customerPhoneNumber: customerPhoneNumber,
        tripType: tripType,
        destination: destination,
        customerPackage: customerPackage,
       tripStatus: tripStatus    
      } 
    }   
        );
        res.status(200).json(shipment);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.deleteShipment = async (req, res, next) => {
    const { shipmentId } = req.params;
    try {
        await Shipment.findByIdAndRemove(shipmentId);
        res.status(200).json({ success: true });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


