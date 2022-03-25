
const req = require('express/lib/request');
const res = require('express/lib/response');
const User = require('../models/user');

exports.createUser = (req, res) => {
  console.log(req.body);
    delete req.body._id;
    /*req.body.password*/;
    const user = new User ({
      ...req.body
    });
    user.save()
      .then(() => res.status(201).json({ message: 'Utilisateur enregistré!'}))
      .catch(error => res.status(400).json({error}));
}

exports.login = (req, res) => {
    
}