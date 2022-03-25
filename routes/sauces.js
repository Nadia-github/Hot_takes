
// On a besoin d'Express
const express = require('express');

const saucesCtrl = require ("../controllers/saucesCtrl");

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

router.post('/', saucesCtrl.createSauce);

router.get('/', saucesCtrl.findAllSauces);

router.get('/:id', saucesCtrl.findSauce);

router.put('/:id', saucesCtrl.modifySauce);

router.delete('/:id', saucesCtrl.deleteSauce);

//router.post('/:id/like', saucesCtrl.likeSauce);

module.exports = router;

