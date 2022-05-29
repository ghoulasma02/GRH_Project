const express= require('express');
const router = express.Router();
const registerEmpCtrl = require('../controllers/registerEmp')
const validEmpCtrl= require('../controllers/login')
const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');
const manag = require('../middleware/isManager');

//router.post('/',[auth,admin],registerEmpCtrl.signupEmp);
//router.put('/',validEmpCtrl.resetPass);
//router.put('/:id',[auth,admin],registerEmpCtrl.assignManag);
//router.put('/:id',auth,registerEmpCtrl.updateInfoUser);
//router.put('/:id',auth,registerEmpCtrl.updateInfoEmployee);
router.get('/',[auth,admin],registerEmpCtrl.listEmployee);
//router.get('/:id',registerEmpCtrl.checkUser);
//router.get('/',[auth,manag],registerEmpCtrl.checkGroupeUser);

 

  module.exports = router;