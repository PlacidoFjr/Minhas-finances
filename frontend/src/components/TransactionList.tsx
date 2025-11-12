import React from 'react';
import './TransactionList.css';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTypeIcon = (type: 'income' | 'expense') => {
    return type === 'income' ? '📈' : '📉';
  };

  const getTypeColor = (type: 'income' | 'expense') => {
    return type === 'income' ? '#4CAF50' : '#F44336';
  };

  if (transactions.length === 0) {
    return (
      <div className="transaction-list-empty">
        <div className="empty-icon">📊</div>
        <h3>Nenhuma transação encontrada</h3>
        <p>Comece adicionando sua primeira transação!</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h2>📋 Transações Recentes</h2>
      <div className="transaction-items">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className="transaction-info">
              <div className="transaction-icon" style={{ color: getTypeColor(transaction.type) }}>
                {getTypeIcon(transaction.type)}
              </div>
              <div className="transaction-details">
                <div className="transaction-description">{transaction.description}</div>
                <div className="transaction-meta">
                  <span className="transaction-category">{transaction.category}</span>
                  <span className="transaction-date">{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>
            <div className="transaction-actions">
              <div 
                className="transaction-amount" 
                style={{ color: getTypeColor(transaction.type) }}
              >
                {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
              </div>
              <div className="transaction-buttons">
                <button 
                  onClick={() => onEdit(transaction)} 
                  className="edit-button"
                  title="Editar"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => onDelete(transaction.id)} 
                  className="delete-button"
                  title="Excluir"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;