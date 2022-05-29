const express= require('express');
const router = express.Router();
const demCongCtrl= require('../controllers/demCong');
const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');
const manag = require('../middleware/isManager');
const multer = require('../middleware/multerConfig');
const authz = require('../middleware/authorization');

//router.post('/',auth,demCongCtrl.createDemCong);
//router.put('/:id',[auth,multer], demCongCtrl.sendCause);
//router.get('/:id',[auth,authz,multer], demCongCtrl.viewCause);
//router.get('/',demCongCtrl.checklistDemCg);
router.get('/', [auth,manag],demCongCtrl.checklistDemCgGroup);
//router.get('/', auth,demCongCtrl.checklistDemCgUser);
//router.get('/:id', [auth,multer],demCongCtrl.checkoneDemCg);
//router.put('/:id',[auth,admin]demCongCtrl.resDemCongAdm);
//router.put('/:id',[auth,manag]demCongCtrl.resDemCongMan);


  module.exports = router;