const express = require("express");
const router = express.Router();
const ComInterneCtrl = require("../controllers/cominterne");

router.post("/", ComInterneCtrl.ajouterComIn);
router.put("/:id", ComInterneCtrl.editcom);
router.get("/", ComInterneCtrl.listerCom);


module.exports = router;