const { UserModel } = require('../models/User');

const userController = {
  // Créer un utilisateur
  createUser: async (req, res) => {
    try {
      const { nom, email, telephone } = req.body;
      
      if (!nom || !email || !telephone) {
        return res.status(400).json({
          success: false,
          message: 'Tous les champs sont requis (nom, email, telephone)'
        });
      }

      const user = UserModel.create({ nom, email, telephone });
      
      res.status(201).json({
        success: true,
        message: 'Utilisateur créé avec succès',
        data: user
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Récupérer tous les utilisateurs
  getAllUsers: async (req, res) => {
    try {
      const users = UserModel.findAll();
      
      res.status(200).json({
        success: true,
        message: 'Liste des utilisateurs récupérée avec succès',
        data: users,
        total: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des utilisateurs'
      });
    }
  },

  // Récupérer un utilisateur par ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = UserModel.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Utilisateur trouvé',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'utilisateur'
      });
    }
  }
};

module.exports = userController;