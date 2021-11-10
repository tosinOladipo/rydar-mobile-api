const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({

    //index key
    _id: { type: String, required: true },

    //shipment information
    riderId:  { type: String, required: true },
    companyID:  { type: String, required: true },
    orderId: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhoneNumber: { type: String, required: true },
    tripType: { 
        type: String, 
        required: true,
        enum: ['pickup', 'delivery']
    },
    destination: { type: String, required: true },

    customerPackage: { type: String, required: true },
    tripStatus: { 
        type: String, 
        required: true,
        enum: ['started', 'pending', 'canceled', 'completed']
    },
    tripMonth: { type: String, required: true },
    tripYear: { type: String, required: true },
    destination: { type: String, required: true },
    destinationLat: { type: Number, required: true },
    destinationLng: { type: Number, required: true },
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('shipment', shipmentSchema);