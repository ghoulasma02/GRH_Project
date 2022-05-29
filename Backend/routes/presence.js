const express= require('express');
const router = express.Router();
const presenceCtrl= require('../controllers/presence');
const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');
const manag = require('../middleware/isManager');
const multer = require('../middleware/multerConfig');
const authz = require('../middleware/authorization');

//router.post('/',[auth,admin,multer], presenceCtrl.savePres);
router.put('/:id',[auth,admin], presenceCtrl.updatePres);
//router.get('/',[auth,admin], admin,presenceCtrl.getPres);
router.get('/', [auth,admin],presenceCtrl.checkAnomaliePres);



  module.exports = router;