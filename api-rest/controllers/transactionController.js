const { TransactionModel } = require('../models/Transaction');
const { UserModel } = require('../models/User');

const transactionController = {
  // Créer une transaction
  createTransaction: async (req, res) => {
    try {
      const { montant, statut, userId } = req.body;
      
      if (!montant || !statut || !userId) {
        return res.status(400).json({
          success: false,
          message: 'Tous les champs sont requis (montant, statut, userId)'
        });
      }

      const user = UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      const transaction = TransactionModel.create({ montant, statut, userId });
      
      res.status(201).json({
        success: true,
        message: 'Transaction créée avec succès',
        data: transaction
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Récupérer toutes les transactions
  getAllTransactions: async (req, res) => {
    try {
      const transactions = TransactionModel.findAll();
      
      const enrichedTransactions = transactions.map(transaction => {
        const user = UserModel.findById(transaction.userId);
        return {
          ...transaction,
          utilisateur: user ? { nom: user.nom, email: user.email } : null
        };
      });
      
      res.status(200).json({
        success: true,
        message: 'Liste des transactions récupérée avec succès',
        data: enrichedTransactions,
        total: transactions.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des transactions'
      });
    }
  },

  // Récupérer une transaction par ID
  getTransactionById: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = TransactionModel.findById(id);
      
      if (!transaction) {
        return res.status(404).json({
          success: false,
          message: 'Transaction non trouvée'
        });
      }

      const user = UserModel.findById(transaction.userId);
      const enrichedTransaction = {
        ...transaction,
        utilisateur: user ? { nom: user.nom, email: user.email } : null
      };

      res.status(200).json({
        success: true,
        message: 'Transaction trouvée',
        data: enrichedTransaction
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de la transaction'
      });
    }
  },

  // Récupérer les transactions d'un utilisateur
  getTransactionsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      
      const user = UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Utilisateur non trouvé'
        });
      }

      const transactions = TransactionModel.findByUserId(userId);
      
      res.status(200).json({
        success: true,
        message: 'Transactions de l\'utilisateur récupérées avec succès',
        data: transactions,
        total: transactions.length,
        utilisateur: { nom: user.nom, email: user.email }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des transactions'
      });
    }
  },

  // Mettre à jour le statut d'une transaction
  updateTransactionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { statut } = req.body;
      
      if (!statut) {
        return res.status(400).json({
          success: false,
          message: 'Le statut est requis'
        });
      }

      const transaction = TransactionModel.updateStatus(id, statut);
      
      res.status(200).json({
        success: true,
        message: 'Statut de la transaction mis à jour avec succès',
        data: transaction
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = transactionController;