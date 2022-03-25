
// On a besoin d'Express
const express = require('express');
const auth = require('../middleware/auth');
const saucesCtrl = require ("../controllers/saucesCtrl");

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

router.post('/', auth, saucesCtrl.createSauce);

router.get('/', auth, saucesCtrl.findAllSauces);

router.get('/:id', auth, saucesCtrl.findSauce);

router.put('/:id', auth, saucesCtrl.modifySauce);

router.delete('/:id', auth, saucesCtrl.deleteSauce);

router.post('/:id/like', auth, saucesCtrl.likeSauce);

module.exports = router;

