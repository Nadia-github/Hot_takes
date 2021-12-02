
// On a besoin d'Express
const express = require('express');

const saucesCtrl = require ("../controllers/saucesCtrl");

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

router.get('/', saucesCtrl.test);

router.get('/test', saucesCtrl.test2)

module.exports = router;