const express = require('express');
const { Database } = require('../database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const db = new Database();

// Middleware de autenticação para todas as rotas
router.use(authenticateToken);

// Listar todas as transações do usuário
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { type, category, startDate, endDate } = req.query;

    let query = 'SELECT * FROM transactions WHERE user_id = ?';
    let params = [userId];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (startDate && endDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY date DESC';

    const transactions = await db.all(query, params);
    res.json(transactions);
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    res.status(500).json({ error: 'Erro ao buscar transações' });
  }
});

// Criar nova transação
router.post('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { description, amount, type, category, date } = req.body;

    if (!description || !amount || !type || !category || !date) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Tipo deve ser income ou expense' });
    }

    await db.run(
      'INSERT INTO transactions (user_id, description, amount, type, category, date) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, description, amount, type, category, date]
    );

    res.status(201).json({ message: 'Transação criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    res.status(500).json({ error: 'Erro ao criar transação' });
  }
});

// Atualizar transação
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactionId = req.params.id;
    const { description, amount, type, category, date } = req.body;

    // Verificar se a transação pertence ao usuário
    const transaction = await db.get(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [transactionId, userId]
    );

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    await db.run(
      'UPDATE transactions SET description = ?, amount = ?, type = ?, category = ?, date = ? WHERE id = ? AND user_id = ?',
      [description, amount, type, category, date, transactionId, userId]
    );

    res.json({ message: 'Transação atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar transação:', error);
    res.status(500).json({ error: 'Erro ao atualizar transação' });
  }
});

// Deletar transação
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactionId = req.params.id;

    // Verificar se a transação pertence ao usuário
    const transaction = await db.get(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [transactionId, userId]
    );

    if (!transaction) {
      return res.status(404).json({ error: 'Transação não encontrada' });
    }

    await db.run(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [transactionId, userId]
    );

    res.json({ message: 'Transação deletada com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    res.status(500).json({ error: 'Erro ao deletar transação' });
  }
});

// Obter resumo financeiro
router.get('/summary', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { startDate, endDate } = req.query;

    let query = 'SELECT type, SUM(amount) as total FROM transactions WHERE user_id = ?';
    let params = [userId];

    if (startDate && endDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' GROUP BY type';

    const summary = await db.all(query, params);
    
    const income = summary.find(s => s.type === 'income')?.total || 0;
    const expense = summary.find(s => s.type === 'expense')?.total || 0;
    const balance = income - expense;

    res.json({
      income: parseFloat(income.toFixed(2)),
      expense: parseFloat(expense.toFixed(2)),
      balance: parseFloat(balance.toFixed(2))
    });
  } catch (error) {
    console.error('Erro ao buscar resumo:', error);
    res.status(500).json({ error: 'Erro ao buscar resumo' });
  }
});

// Obter categorias mais usadas
router.get('/categories', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { startDate, endDate } = req.query;

    let query = 'SELECT category, type, SUM(amount) as total, COUNT(*) as count FROM transactions WHERE user_id = ?';
    let params = [userId];

    if (startDate && endDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' GROUP BY category, type ORDER BY total DESC';

    const categories = await db.all(query, params);
    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

module.exports = router;

