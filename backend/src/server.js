const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Database } = require('./database');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Em produção, defina a URL do seu frontend
  credentials: true
}));
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Rota catch-all para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'NOT_FOUND',
    message: 'Rota não encontrada',
    path: req.originalUrl
  });
});

// Inicializar banco de dados
const db = new Database();
db.initialize();

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Sistema de Controle Financeiro iniciado!`);
});

