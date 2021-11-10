const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const riderSchema = new Schema({

    //Personal Information
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true},
    otherPhoneNumber: { type: String, required: true },
    maritalStatus: { 
        type: String, 
        required: true,
        enum: ['Single', 'Married']
    },
    dateOfBirth: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    country: { type: String, required: true },
    stateOfOrigin: { type: String, required: true },
    localGovtArea: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    nationalIdentityNum: { type: String, required: true },
    driverLicenseNum: { type: String, required: true},
    profileImg: { type: String },

    //Next of Kin
    nextOfKinFullname: { type: String, required: true },
    nextOfKinAddress: { type: String, required: true },
    nextOfKinPhoneNumber: { type: String, required: true },
    nextOfKinRelationship: { type: String, required: true },

    //Guarantor details
    guarantorOneFullname: { type: String, required: true },
    guarantorOneAddress: { type: String, required: true },
    guarantorOnePhoneNumber: { type: String, required: true },
    guarantorOneNIN: { type: String, required: true },

    guarantorTwoFullname: { type: String, required: true },
    guarantorTwoAddress: { type: String, required: true },
    guarantorTwoPhoneNumber: { type: String, required: true },
    guarantorTwoNIN: { type: String, required: true },

    //Parents information
    parentsName: { type: String },
    parentsAddress: { type: String },
    parentsPhoneNumber: { type: String },

    //Bank information
    bankName: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
    bvn: { type: String, required: true },

    //Company information
    companyID: { type: String, default: "unassigned" },

    //Location information
    cordsLatt: { type: Number, default: "1234" },
    cordsLong: { type: Number, default: "1234" },
    cordsTime: { type: String, default: "unassigned" },
    cordsAddress: { type: String, default: "unassigned" },

    //Internet status
    onlineStatus: { type: String, default: "unassigned" },

    createdOn: { type: Date, default: Date.now }
});


riderSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

riderSchema.methods.isPasswordValid = async function (value) {
    try {
        return await bcrypt.compare(value, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('rider', riderSchema);