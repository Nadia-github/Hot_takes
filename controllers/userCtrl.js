
const req = require('express/lib/request');
const res = require('express/lib/response');
const user = require('../models/user');

exports.createUser = (req, res) => {
    delete req.body._id;
    /*req.body.password*/;
    const user = new user ({
      ...req.body
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur enregistré!'}))
      .catch(error => res.status(400).json({error}));
}

exports.login = (req, res) => {
    
}