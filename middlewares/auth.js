const jwt = require('jsonwebtoken');
require ("dotenv").config();


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; 
    /* Ici on utilise le module JWT afin de vérifié le token pour savoir si c'est un vrai utilisateur 
    Le token est crypté d'une certaine façon que l'on peut savoir si c'est un véritable token*/
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // on met le userId dans le token pour savoir qui est la personne connectée
    const userId = decodedToken.userId;
    res.locals.userId = userId;
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