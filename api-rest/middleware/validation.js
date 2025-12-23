// Middleware de validation pour les utilisateurs
const validateUser = (req, res, next) => {
  const { nom, email, telephone } = req.body;
  
  if (!nom || typeof nom !== 'string' || nom.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Le nom est requis et doit être une chaîne non vide'
    });
  }
  
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'L\'email est requis et doit être une chaîne non vide'
    });
  }
  
  if (!telephone || typeof telephone !== 'string' || telephone.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Le téléphone est requis et doit être une chaîne non vide'
    });
  }
  
  req.body.nom = nom.trim();
  req.body.email = email.trim().toLowerCase();
  req.body.telephone = telephone.trim();
  
  next();
};

const validateTransaction = (req, res, next) => {
  const { montant, statut, userId } = req.body;
  
  if (!montant || typeof montant !== 'number') {
    return res.status(400).json({
      success: false,
      message: 'Le montant est requis et doit être un nombre'
    });
  }
  
  if (!statut || typeof statut !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Le statut est requis et doit être une chaîne'
    });
  }
  
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'L\'ID utilisateur est requis et doit être une chaîne'
    });
  }
  
  req.body.statut = statut.trim().toLowerCase();
  req.body.userId = userId.trim();
  
  next();
};

const validateUUID = (paramName) => {
  return (req, res, next) => {
    const value = req.params[paramName];
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
    if (!value || !uuidRegex.test(value)) {
      return res.status(400).json({
        success: false,
        message: `Paramètre ${paramName} invalide: doit être un UUID valide`
      });
    }
    
    next();
  };
};
module.exports = {
  validateUser,
  validateTransaction,
  validateUUID
};