const express = require('express');
const tourController = require("../controllers/tourController");

const router = express.Router();

// router.param('id', tourController.checkID);


router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getToursStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);


router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour);
// .post(tourController.checkBody, tourController.createTour);

router.route('/:id')
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)
    .get(tourController.getTour);

module.exports = router;