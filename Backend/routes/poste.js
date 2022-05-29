const express= require('express');
const router = express.Router();
const postCtrl= require('../controllers/poste');
const auth = require('../middleware/auth');
const admin = require('../middleware/isAdmin');




router.post('/'/*,[auth,admin]*/,postCtrl.createPoste);
router.get('/'/*,[auth,admin]*/,postCtrl.listPost);
//router.put('/:id',[auth,admin], postCtrl.editPost);
//router.get('/:id',auth, postCtrl.checkonePst);
//router.get('/',auth, postCtrl.checkPstUser)

module.exports = router;