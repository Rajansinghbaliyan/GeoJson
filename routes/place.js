const express = require("express");

const router = express.Router();

const placesController = require("../controller/placeController");

router
  .route("/")
  .post(placesController.addPlace)
  .get(placesController.getPlacesNearMe);

router.route("/radius").get(placesController.getPlacesWithInRadius);

module.exports = router;
