const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const companySchema = new Schema({

    //company informaion
    yourName: { type: String, required: true },
    companyName: { type: String, required: true },
    companylogo: { type: String, default: "Unassigned" },
    companyEmail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [emailValidator, 'incorrect mail format']
    },
    password: { type: String, required: true },
    companyPhoneOne: { type: String, required: true },
    companyPhoneTwo: { type: String },
    companyAddress: { type: String, required: true },

    //Bank Information
    companyBankName: { type: String, default: "Unassigned" },
    companyBankAccount: { type: String, default: "Unassigned" },
    companyBVN: { type: String, rdefault: "Unassigned" }
});


//Email Validator
function emailValidator(value) {
    return /^.+@.+\..+$/.test(value);
}

companySchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

companySchema.methods.isPasswordValid = async function (value) {
    try {
        return await bcrypt.compare(value, this.password);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model('company', companySchema);