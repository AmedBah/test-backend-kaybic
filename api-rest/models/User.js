const { v4: uuidv4 } = require('uuid');

class User {
  constructor(nom, email, telephone) {
    this.id = uuidv4();
    this.nom = nom;
    this.email = email;
    this.telephone = telephone;
    this.dateCreation = new Date();
  }

  static validate(userData) {
    const errors = [];
    
    if (!userData.nom || userData.nom.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!userData.email || !User.isValidEmail(userData.email)) {
      errors.push('Email invalide');
    }
    
    if (!userData.telephone || userData.telephone.trim().length < 8) {
      errors.push('Le numéro de téléphone doit contenir au moins 8 caractères');
    }
    
    return errors;
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Stockage en mémoire
const users = [];

const UserModel = {
  create: (userData) => {
    const errors = User.validate(userData);
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
    
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }
    
    const user = new User(userData.nom, userData.email, userData.telephone);
    users.push(user);
    return user;
  },

  findAll: () => {
    return users;
  },

  findById: (id) => {
    return users.find(user => user.id === id);
  },

  findByEmail: (email) => {
    return users.find(user => user.email === email);
  }
};

module.exports = { User, UserModel };