const express = require('express');
const router = express.Router();

const companyController = require('./../controllers/company');


router.post('/register', companyController.register);
router.post('/login', companyController.login);

router.route('/')
    .get(companyController.getAllCompanies)

router.route('/:companyId')
    .get(companyController.getCompanyById)
    .put(companyController.updateCompany)
    .delete(companyController.deleteCompany);

module.exports = router;