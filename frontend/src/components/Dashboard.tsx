import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { transactionsAPI } from '../services/api';
import Charts from './Charts';
import './Dashboard.css';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const Dashboard: React.FC = () => {
   const [transactions, setTransactions] = useState<Transaction[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
   const [editingId, setEditingId] = useState<number | null>(null);
   const [formData, setFormData] = useState({
     description: '',
     amount: '',
     type: 'income' as 'income' | 'expense',
     category: '',
     isInstallment: false,
     installments: 1,
     firstInstallmentDate: new Date().toISOString().split('T')[0]
   });
  const [showForm, setShowForm] = useState(false);
  // Filtros
  const [filterMonth, setFilterMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [filterMonth, filterType, filterCategory]);

  const getMonthRange = (ym: string) => {
    if (!ym || ym.length !== 7) return { startDate: undefined, endDate: undefined };
    const year = parseInt(ym.slice(0, 4), 10);
    const month = parseInt(ym.slice(5, 7), 10) - 1; // 0-based
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const fmt = (d: Date) => d.toISOString().split('T')[0];
    return { startDate: fmt(start), endDate: fmt(end) };
  };

  const fetchTransactions = async () => {
    try {
      const params: any = {};
      // mês
      const { startDate, endDate } = getMonthRange(filterMonth);
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      // tipo
      if (filterType !== 'all') params.type = filterType;
      // categoria
      if (filterCategory !== 'all') params.category = filterCategory;

      const response = await transactionsAPI.getAll(params);
      setTransactions(response.data);
      // atualizar categorias disponíveis com base nos dados retornados
      const cats = Array.from(new Set<string>(response.data.map((t: Transaction) => t.category))).sort();
      setAvailableCategories(cats);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar transações');
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Sem token de autenticação');

      const amountNum = parseFloat(formData.amount);
      if (isNaN(amountNum) || !isFinite(amountNum) || amountNum <= 0) {
        alert('Informe um valor válido (> 0) para a transação.');
        return;
      }

      // Lógica de compra parcelada: cria N transações mensais
      if (formData.isInstallment && formData.type === 'expense' && formData.installments > 1) {
        const total = amountNum;
        const n = formData.installments;
        const first = new Date(formData.firstInstallmentDate);

        if (isNaN(total) || total <= 0) throw new Error('Valor total inválido');

        const per = Math.round((total / n) * 100) / 100;
        const amounts: number[] = [];
        for (let i = 0; i < n - 1; i++) amounts.push(per);
        const last = Math.round((total - per * (n - 1)) * 100) / 100;
        amounts.push(last);

        for (let i = 0; i < n; i++) {
          const d = new Date(first);
          d.setMonth(d.getMonth() + i);
          const dateStr = d.toISOString().split('T')[0];
          const desc = `${formData.description} (Parcela ${i + 1}/${n})`;

          try {
            await transactionsAPI.create({
              description: desc,
              amount: amounts[i],
              type: 'expense',
              category: formData.category || 'Cartão de Crédito',
              date: dateStr
            });
          } catch (err: any) {
            const msg = err?.response?.data?.error || err?.message || `${err}`;
            throw new Error(`Erro ao criar parcela ${i + 1}: ${msg}`);
          }
        }

        // Reset após criar todas as parcelas
        setFormData({
          description: '',
          amount: '',
          type: 'income' as 'income' | 'expense',
          category: '',
          isInstallment: false,
          installments: 1,
          firstInstallmentDate: new Date().toISOString().split('T')[0]
        });
        fetchTransactions();
      } else {
        // Fluxo padrão: cria única transação usando client axios
        try {
          await transactionsAPI.create({
            description: formData.description,
            amount: amountNum,
            type: formData.type,
            category: formData.category,
            date: new Date().toISOString().split('T')[0]
          });
        } catch (err: any) {
          const msg = err?.response?.data?.error || err?.message || `${err}`;
          throw new Error(msg);
        }

        setFormData({
          description: '',
          amount: '',
          type: 'income' as 'income' | 'expense',
          category: '',
          isInstallment: false,
          installments: 1,
          firstInstallmentDate: new Date().toISOString().split('T')[0]
        });
        fetchTransactions();
      }
    } catch (error: any) {
      console.error('Erro:', error);
      alert(error?.message || 'Erro ao salvar transação');
    }
  };



  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      try {
        await transactionsAPI.delete(id);
        fetchTransactions();
      } catch (err) {
        setError('Erro ao excluir transação');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  if (loading) return (
    <div className="loading-container">
      <div className="loading"></div>
      <p>Carregando...</p>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="brand-section">
          <h1>Finanças Pro</h1>
          <p>Gestão financeira inteligente</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Sair
        </button>
      </div>

      <div className="summary-cards">
        <motion.div 
          className="summary-card income"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L12 22M12 2L18 8M12 2L6 8"/>
            </svg>
          </div>
          <div className="card-content">
            <h3>Receitas</h3>
            <p className="amount">R$ {totalIncome.toFixed(2)}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="summary-card expense"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L12 22M12 22L18 16M12 22L6 16"/>
            </svg>
          </div>
          <div className="card-content">
            <h3>Despesas</h3>
            <p className="amount">R$ {totalExpense.toFixed(2)}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className={`summary-card balance ${balance >= 0 ? 'positive' : 'negative'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="card-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h18v18H3zM12 8v8M8 12h8"/>
            </svg>
          </div>
          <div className="card-content">
            <h3>Saldo</h3>
            <p className="amount">R$ {balance.toFixed(2)}</p>
          </div>
        </motion.div>
      </div>

      <div className="charts-section">
        <Charts transactions={transactions} />
      </div>

      {/* Informativo simples de parcelas restantes */}
      {transactions.length > 0 && (
        <div className="transaction-form" style={{ marginTop: '1rem' }}>
          {(() => {
            const today = new Date();
            const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const remaining = transactions.filter(t => t.description.includes('Parcela') && new Date(t.date) >= startOfMonth).length;
            return (
              <div>
                <h3>Parcelas Restantes</h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {remaining > 0 ? `${remaining} parcela(s) ainda a vencer a partir deste mês.` : 'Nenhuma parcela restante a partir deste mês.'}
                </p>
              </div>
            );
          })()}
        </div>
      )}

      <motion.div 
        className="transaction-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <h3>Adicionar Transação</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                placeholder="Ex: Salário, Aluguel, Supermercado"
              />
            </div>
            <div className="form-group">
              <label>Valor</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Compra parcelada (Cartão)</label>
              <select
                value={formData.isInstallment ? 'yes' : 'no'}
                onChange={(e) => setFormData({ ...formData, isInstallment: e.target.value === 'yes' })}
              >
                <option value="no">Não</option>
                <option value="yes">Sim</option>
              </select>
            </div>
            {formData.isInstallment && (
              <div className="form-group">
                <label>Número de parcelas</label>
                <input
                  type="number"
                  min={1}
                  value={formData.installments}
                  onChange={(e) => setFormData({ ...formData, installments: Math.max(1, parseInt(e.target.value || '1', 10)) })}
                  required
                  placeholder="Ex: 12"
                />
              </div>
            )}
          </div>
          {formData.isInstallment && (
            <div className="form-row">
              <div className="form-group">
                <label>Data da primeira parcela</label>
                <input
                  type="date"
                  value={formData.firstInstallmentDate}
                  onChange={(e) => setFormData({ ...formData, firstInstallmentDate: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Observação</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Cartão de Crédito"
                />
              </div>
            </div>
          )}
          <div className="form-row">
            <div className="form-group">
              <label>Categoria</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="Ex: Alimentação, Transporte, Lazer"
              />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                required
              >
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Adicionar Transação
          </button>
        </form>
      </motion.div>

      <motion.div 
        className="transactions-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h3>Transações Recentes</h3>
        {/* Barra de filtros */}
        <div className="filters-bar">
          <div className="form-group">
            <label>Mês</label>
            <input
              type="month"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value as 'all' | 'income' | 'expense')}>
              <option value="all">Todos</option>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">Todas</option>
              {availableCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="filters-actions">
            <button
              className="clear-filters-btn"
              type="button"
              onClick={() => {
                // reset filtros
                setFilterMonth(new Date().toISOString().slice(0, 7));
                setFilterType('all');
                setFilterCategory('all');
              }}
            >
              Limpar filtros
            </button>
          </div>
        </div>
        {transactions.length === 0 ? (
          <div className="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M9 14l6-6m0 0l-6-6m6 6h12M3 12h12"/>
            </svg>
            <p>Nenhuma transação cadastrada</p>
            <span>Comece adicionando sua primeira transação acima</span>
          </div>
        ) : (
          <div className="transactions-table">
            <div className="table-header">
              <span>Data</span>
              <span>Descrição</span>
              <span>Categoria</span>
              <span>Valor</span>
              <span>Ações</span>
            </div>
            {transactions.map((transaction, index) => (
              <motion.div 
                key={transaction.id} 
                className={`transaction-item ${transaction.type}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="date">{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                <span className="description">{transaction.description}</span>
                <span className="category">{transaction.category}</span>
                <span className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toFixed(2)}
                </span>
                <span className="actions">
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="delete-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6"/>
                    </svg>
                  </button>
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;