// gestion globale des erreurs
const errorHandler = (err, req, res, next) => {
  console.error('Erreur:', err);

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'JSON invalide dans la requête'
    });
  }

  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route non trouvée: ${req.method} ${req.originalUrl}`
  });
};

module.exports = {
  errorHandler,
  notFound,
};