const express = require("express");
const router = express.Router();
const PlanifierCongeCtrl = require("../controllers/conge");

router.post("/", PlanifierCongeCtrl.planifierConge);
router.get("/",PlanifierCongeCtrl.ListerLesPlanificationDeCongĂ©AnnuelPourAdmin);


module.exports = router;
