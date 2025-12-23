const express = require('express');
const cors = require('cors');

// Import des routes
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const { errorHandler, notFound} = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true }));

// Route de base pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API REST opérationnelle',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      transactions: '/api/transactions'
    }
  });
});



// Routes principales
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});


module.exports = app;