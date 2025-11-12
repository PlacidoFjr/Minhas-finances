import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Database } from './database';
import authRoutes from './routes/auth';
import transactionRoutes from './routes/transactions';

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