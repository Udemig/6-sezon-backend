// turlar ilae alakalı Apı'da tanımlanacak bütün endpointleri / routeları bu dosya da tanımlanır.

const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController.js");
const formatOuery = require("../middleware/formatOuery.js");

const router = express.Router();

// ----- yollar

router.route("/api/top-tours").get(aliasTopTours, getAllTours);

//turların istaististiklerinin alınmaıs için route
// gerçek seneryo : admin paneli için zorluğa göre turların istatististikleirni hesapla

router.route("/api/tour-stats").get(getTourStats);

//gerçek senerya: admin paneli için parametre olarak gelen yılın her ayında jkaç tur başlayacak

router.route("/api/monthly-plan/:year").get(getMonthlyPlan);

router.route("/api/tours").get(formatOuery, getAllTours).post(createTour);

router
  .route("/api/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
