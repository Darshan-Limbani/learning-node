const express = require('express');
const tourController = require("../controllers/tourController");
const {checkID} = require("../controllers/tourController");

const router = express.Router();

router.param('id', tourController.checkID);

router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router.route('/:id')
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)
    .get(tourController.getTour);

module.exports = router;