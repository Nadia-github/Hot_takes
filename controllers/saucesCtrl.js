const sauces = require('./models/sauces');

exports.test = (req, res) => res.status(200).json({message : 'coucou'})

exports.test2 = (req, res) => res.status(200).json({message : 'coucou test2'})

exports.createSauce = (req, res) => {
    delete req.body._id;
    const sauce = new sauces ({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré!'}))
      .catch(error => res.status(400).json({error}));
}


