const express = require("express");
const areaController = require("../controller/areaController");

const router = express.Router();

router.route("/").post(areaController.addArea).get(areaController.withInArea);



module.exports = router;
