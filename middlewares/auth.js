const jwt = require('jsonwebtoken');
require ("dotenv").config();


module.exports = (req, res, next) => {
  try {
    // on récupère les entêtes de la requête et on cherche le paramètre "autorization" parmi ces entêtes 
    const token = req.headers.authorization.split(' ')[1]; 
    // Ici on utilise le module JWT afin de vérifié le token pour savoir si c'est un vrai utilisateur 
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // on met le userId dans le token 
    const userId = decodedToken.userId;
    // on passe la donnée d'une fonction à une autre, qu'elle reste dans la réponse
    res.locals.userId = userId;
    // Si l'utilisateur a envoyé un userId dans sa requête, on vérifie si le userId est bien le sien
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};