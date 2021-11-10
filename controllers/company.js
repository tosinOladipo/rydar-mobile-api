const jwt = require('jsonwebtoken');
const Company = require('./../models/company');


//Register new company
exports.register = async (req, res, next) => {
    const { 
        yourName, 
        companyName, 
        companyLogo,
        companyEmail,
        password,
        companyPhoneOne,
        companyPhoneTwo,
        companyAddress,
        companyBankName,
        companyBankAccount,
        companyBVN
    } = req.body;
    const company = await Company.findOne({ companyEmail });
    if (company)
        return res.status(403).json({ error: { message: 'Email already in use!' } });
    const newCompany = new Company({ 
        yourName, 
        companyName, 
        companyLogo,
        companyEmail,
        password,
        companyPhoneOne,
        companyPhoneTwo,
        companyAddress,
        companyBankName,
        companyBankAccount,
        companyBVN
     });

    try {
        const company = await newCompany.save();
        const token = getSignedToken(company);
        res.status(200).json({ token, company });
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


//Login company
exports.login = async (req, res, next) => {
    const { companyEmail, password } = req.body;
    const company = await Company.findOne({ companyEmail });
    if (!company)
        return res.status(403).json({ error: { message: 'invalid email/password' } });
    const isValid = await company.isPasswordValid(password);
    if (!isValid)
        return res.status(403).json({ error: { message: 'invalid email/password' } });
        const token = getSignedToken(company);
    res.status(200).json({ token, company });
};

//Get all Companies from API
exports.getAllCompanies = async (req, res, next) => {
    const companies = await Company.find();
    res.status(200).json(companies);
};


//Get Individual Company Information by ID
exports.getCompanyById = async (req, res, next) => {
    const { companyId } = req.params;
    try {
        const company = await Company.findById(companyId);
        res.status(200).json({company});
    } catch (error) {
        error.status = 400;
        next(error);
    }
};


//Edit Individual Company Information by ID
exports.updateCompany = async (req, res, next) => {
    const { companyId } = req.params;
    try {
        await Company.findByIdAndUpdate(companyId, req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

//Delete Individual Company Information by ID
exports.deleteCompany = async (req, res, next) => {
    const { companyId } = req.params;
    try {
        await Company.findByIdAndRemove(companyId);
        res.status(200).json({ success: true });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};




//Process Token for Company
getSignedToken = company => {
    return jwt.sign({
        id: company._id,
        companyEmail: company.companyEmail,
        companyName: company.companyName,
    }, process.env.COMPANY_SECRET_KEY, { expiresIn: '18h' });
};