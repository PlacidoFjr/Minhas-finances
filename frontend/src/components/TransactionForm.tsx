import React, { useState, useEffect } from 'react';
import { transactionsAPI } from '../services/api';
import './TransactionForm.css';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface TransactionFormProps {
  onTransactionAdded: () => void;
  onTransactionUpdated: () => void;
  editingTransaction: Transaction | null;
  onCancel: () => void;
}

const CATEGORIES = {
  income: ['Salário', 'Freelance', 'Investimentos', 'Outros'],
  expense: ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Outros'],
};

const TransactionForm: React.FC<TransactionFormProps> = ({
  onTransactionAdded,
  onTransactionUpdated,
  editingTransaction,
  onCancel,
}) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setDescription(editingTransaction.description);
      setAmount(editingTransaction.amount.toString());
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setDate(editingTransaction.date);
    } else {
      setDescription('');
      setAmount('');
      setType('income');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [editingTransaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const transactionData = {
        description,
        amount: parseFloat(amount),
        type,
        category,
        date,
      };

      if (editingTransaction) {
        await transactionsAPI.update(editingTransaction.id, transactionData);
        onTransactionUpdated();
      } else {
        await transactionsAPI.create(transactionData);
        onTransactionAdded();
      }

      // Reset form
      setDescription('');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transaction-form-overlay">
      <div className="transaction-form-card">
        <div className="form-header">
          <h2>{editingTransaction ? 'Editar Transação' : 'Nova Transação'}</h2>
          <button onClick={onCancel} className="close-button">×</button>
        </div>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label>Tipo</label>
            <div className="type-selector">
              <button
                type="button"
                className={`type-button ${type === 'income' ? 'active income' : ''}`}
                onClick={() => setType('income')}
              >
                📈 Entrada
              </button>
              <button
                type="button"
                className={`type-button ${type === 'expense' ? 'active expense' : ''}`}
                onClick={() => setType('expense')}
              >
                📉 Saída
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Ex: Salário do mês"
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Valor</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Selecione uma categoria</option>
              {CATEGORIES[type].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Data</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancelar
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Salvando...' : (editingTransaction ? 'Atualizar' : 'Adicionar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;