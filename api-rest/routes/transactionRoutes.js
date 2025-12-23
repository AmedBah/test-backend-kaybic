const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Routes pour les transactions
router.post('/', transactionController.createTransaction);                    
router.get('/', transactionController.getAllTransactions);                   
router.get('/:id', transactionController.getTransactionById);               
router.get('/user/:userId', transactionController.getTransactionsByUser);  
router.put('/:id/status', transactionController.updateTransactionStatus);   
module.exports = router;