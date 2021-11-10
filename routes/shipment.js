const express = require('express');
const router = express.Router();

const shipmentController = require('./../controllers/shipment');

router.get('/pending/:riderId', shipmentController.getPendingShipments);
router.get('/all-pending', shipmentController.getAllPendingShipments);
router.get('/company-pending/:companyId', shipmentController.getCompanyPendingShipments);
router.get('/started/:riderId', shipmentController.getStartedShipments);
router.get('/all-started', shipmentController.getAllStartedShipments);
router.get('/company-started/:companyId', shipmentController.getCompanyStartedShipments);
router.get('/current/:riderId', shipmentController.getCurrentShipment);
router.get('/completed/:riderId', shipmentController.getCompletedShipments);
router.get('/all-completed', shipmentController.getAllCompletedShipments);
router.get('/company-completed/:companyId', shipmentController.getCompanyCompletedShipments);
router.get('/rider/:riderId', shipmentController.getRiderShipments);
router.get('/rider/month/:riderId/:tripMonth/:tripYear', shipmentController.getRiderMonthlyShipments);
router.get('/company/month/:companyId/:tripMonth/:tripYear', shipmentController.getCompanyMonthlyShipments);
router.put('/start-trip/:riderId/:orderId', shipmentController.startShipment);


router.route('/')
    .get(shipmentController.getAllShipments)
    .post(shipmentController.postShipment);

router.route('/:orderId')
    .get(shipmentController.getShipmentById)
    .put(shipmentController.startShipment)
    .delete(shipmentController.deleteShipment);

module.exports = router;