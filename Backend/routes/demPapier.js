const express= require('express');
const router = express.Router();
const demPapCtrl= require('../controllers/demPapier');
const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');



router.post('/'/*,auth*/,demPapCtrl.createDemPap);
router.get('/',/* [auth,admin],*/demPapCtrl.listDemPapier);
//router.get('/', auth,demPapCtrl.checklistDemPapUser);
//router.get('/:id', auth,demPapCtrl.checkoneDemPap);
//router.put('/:id',auth,demPapCtrl.resDemPapier);


module.exports = router;