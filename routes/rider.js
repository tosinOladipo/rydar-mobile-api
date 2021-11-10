const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const riderController = require('./../controllers/rider');

router.post('/login', riderController.login);
router.post('/register', upload.single('profileImg'), riderController.postRider);
router.get('/company/:companyId', riderController.getRidersByCompanyId);

router.route('/')
    .get(riderController.getAllRiders)

router.route('/:riderId')
    .get(riderController.getRiderById)
    .put(riderController.updateRider)
    .delete(riderController.deleteRider);

module.exports = router;