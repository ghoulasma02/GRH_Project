const express= require('express');
const router = express.Router();
const demAbsCtrl= require('../controllers/demAbs');
const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');
const manag = require('../middleware/isManager');
const multer = require('../middleware/multerConfig');
const authz = require('../middleware/authorization');

//router.post('/',auth,demAbsCtrl.createDemAbs);
//router.put('/:id',[auth,multer], demAbsCtrl.sendJust);
//router.get('/:id',[auth,authz,multer], demAbsCtrl.viewJust);
//router.get('/', [auth,admin],demAbsCtrl.checklistDemAbs);
//router.get('/', [auth,manag],demAbsCtrl.checklistDemAbsGroup);
//router.get('/', auth,demAbsCtrl.checklistDemAbsUser);
router.get('/:id', [auth,multer],demAbsCtrl.checkoneDemAbs);
//router.put('/:id',[auth,authz],demAbsCtrl.resDemAbsMan);


  module.exports = router;