const { v4: uuidv4 } = require('uuid');

let transactionCounter = 1;

class Transaction {
  constructor(montant, statut, userId) {
    this.id = `EFB.${transactionCounter.toString().padStart(8, '0')}`;
    transactionCounter++;
    
    this.montant = montant;
    this.statut = statut;
    this.userId = userId; 
    this.date = new Date();
  }

  // Validation des données de transaction
  static validate(transactionData) {
    const errors = [];
    
    if (!transactionData.montant || typeof transactionData.montant !== 'number' || transactionData.montant <= 0) {
      errors.push('Le montant doit être un nombre positif');
    }
    
    const validStatuts = ['PENDING', 'SUCCESSFUL', 'FAILED'];
    if (!transactionData.statut || !validStatuts.includes(transactionData.statut)) {
      errors.push('Le statut doit être: PENDING, SUCCESSFUL ou FAILED');
    }
    
    if (!transactionData.userId) {
      errors.push('L\'ID utilisateur est requis');
    }
    
    return errors;
  }
}

// Stockage en mémoire
const transactions = [];

const TransactionModel = {
  create: (transactionData) => {
    const errors = Transaction.validate(transactionData);
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    
    const transaction = new Transaction(
      transactionData.montant,
      transactionData.statut,
      transactionData.userId
    );
    transactions.push(transaction);
    return transaction;
  },

  findAll: () => {
    return transactions;
  },

  findById: (id) => {
    return transactions.find(transaction => transaction.id === id);
  },

  findByUserId: (userId) => {
    return transactions.filter(transaction => transaction.userId === userId);
  },

  updateStatus: (id, newStatus) => {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) {
      throw new Error('Transaction non trouvée');
    }
    
    const validStatuts = ['SUCCESSFUL', 'FAILED', 'PENDING'];
    if (!validStatuts.includes(newStatus)) {
      throw new Error('Statut invalide');
    }
    
    transaction.statut = newStatus;
    return transaction;
  }
};

module.exports = { Transaction, TransactionModel };