const express = require('express');
const tourController = require("../controllers/tourController");
const authController = require("../controllers/authController");
const reviewRouter = require('../routes/reviewRoutes');
const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tours/13215faa4a/reviews
// GET /tours/13215faa4a/reviews

// router.route('/:tourId/reviews')
//     .post(authController.protect,
//         authController.restrictTo('user'),
//         reviewController.createReview);

router.use('/:tourId/reviews', reviewRouter);


router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getToursStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);


router.route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.createTour);
// .post(tourController.checkBody, tourController.createTour);

router.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide'),
        tourController.deleteTour);

module.exports = router;