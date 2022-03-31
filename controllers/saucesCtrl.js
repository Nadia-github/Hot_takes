const Sauce = require("../models/sauces");
const fs = require("fs");

/* Enregistre dans la BDD la sauce que l'utilisateur a créer */
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);
  delete req.body._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré!" }))
    .catch((error) => res.status(400).json({ error }));
};

/* retourne un tableau d'objet sauce */
exports.findAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => res.status(201).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

/* retourne  un objet sauce correspondant a l'id passé en paramètre */
exports.findSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

// met à jour la sauce et retourne un message d'erreur le cas échéant
exports.modifySauce = (req, res) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

/* supprime la sauce dont l'id est en paramètre */
exports.deleteSauce = (req, res, then) => {
  //recherche la sauce dans la BDD
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //récupère le chemin physique de l'image
      const filename = sauce.imageUrl.split("/images/")[1];
      // supprime l'image des dossiers du serveur
      fs.unlink(`images/${filename}`, () => {
        // supprime la sauce de la BDD et retourne un message le confirmant
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    // erreur si la sauce n'a pu être recherché
    .catch((error) => res.status(500).json({ error }));
};

/* gère les likes et les dislikes */

exports.likeSauce = (req, res, then) => {
  // recherche la sauce dans la BDD
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // selon la valeur du like, un bloc de code différent sera exécuté
      switch (req.body.like) {
        case -1:
          /* n'aime pas : on incrémente les dislikes et on ajoute le userId au array usersDisliked*/
          sauce.dislikes++;
          // ajoute l'id de l'utilisateur au tableur des userDisliked
          sauce.usersDisliked.push(req.body.userId);

          break;
        case 0:
          /* annule le vote : supprime le userId du array ou il se trouve et décrémente le 
                  likes ou dislikes selon la présence ou non de l'id dans le array*/
                  
          break;
        case 1:
          /* aime : incrémente les likes et ajoute le userId au array usersLiked*/
          sauce.likes++;
          //ajoute l'id de l'utilisateur dans le tableau userLiked
          sauce.usersLiked.push(req.body.userId);
          break;
        default:
          // Si la valeur de like passé en paramètre n'entre pas dans les 3 cas précèdent
          // un message d'erreur est retourné
          res.status(404).json({ message: "Error : unknown like type !" });
          return;
          break;
      }
      // met à jour la BDD avec les valeurs modifiés précédemment
      Sauce.updateOne(
        { _id: req.params.id },
        {
          likes: sauce.likes,
          dislikes: sauce.dislikes,
          usersLiked: sauce.usersLiked,
          usersDisliked: sauce.usersDisliked,
          _id: req.params.id,
        }
      )
        .then(() => {
          // retourne un message confirmant la mise à jour
          res.status(200).json({ message: "Like de la sauce modifié !" });
        })
        .catch((error) => {
          // message d'erreur si la sauce n'a pu être mise à jour
          res.status(400).json({ error });
        });
    })
    // message d'erreur si la sauce n'a pu être recherché
    .catch((error) => {
      res.status(404).json({ error });
    });
};
