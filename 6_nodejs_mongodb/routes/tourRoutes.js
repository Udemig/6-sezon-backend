// turlar ilae alakalı Apı'da tanımlanacak bütün endpointleri / routeları bu dosya da tanımlanır.

const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController.js");
const formatOuery = require("../middleware/formatOuery.js");

const router = express.Router();

// ----- yollar

router.route("/api/tours").get(formatOuery, getAllTours).post(createTour);

router
  .route("/api/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
