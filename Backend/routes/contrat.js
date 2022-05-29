const express= require('express');
const router = express.Router();
const contCtrl = require('../controllers/contrat');
const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');
const multer = require('../middleware/multerConfig');




router.post('/',/* [auth,admin],*/[multer],contCtrl.createContrat);
router.get('/',/*[auth,admin],*/contCtrl.listCont);
//router.put('/:id', [auth,admin], contCtrl.editCont);
//router.put('/:id', /*[auth,admin,*/[multer],contCtrl.sendPj);
//router.get('/:id',/* [auth,admin,*/[multer], contCtrl.viewPj);
//router.get('/',auth,contCtrl.checkContUser);
//router.get('/:id',auth,contCtrl.getOneCont);


module.exports = router;