const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();


router.route('/')
    .get(reviewController.getAllReview)
    .post(
        authController.protect,
        authController.restrictTo('user'),
        reviewController.createReview
    );

// router.route('/', reviewController.getAllReview);


module.exports = router;