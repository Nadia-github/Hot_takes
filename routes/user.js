

// Contient les fonctions qui s'appliquent aux différentes routes pour les utilisateurs

// On a besoin d'Express
const express = require('express');

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

router.post('/signup', (req, res) => res.status(200).json({message : 'coucou'}));

module.exports = router;