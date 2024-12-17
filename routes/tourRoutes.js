const express = require('express');
const router = express.Router();
const toursController = require('./../controllers/toursController');


router.route('/').get(toursController.getAllTours).post(toursController.addNewTour)
router.route('/:id').get(toursController.getTourById).patch(toursController.editTour).delete(toursController.deleteTour)

module.exports = router;