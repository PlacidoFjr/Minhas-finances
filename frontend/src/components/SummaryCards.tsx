import React from 'react';
import './SummaryCards.css';

interface Summary {
  income: number;
  expense: number;
  balance: number;
}

interface SummaryCardsProps {
  summary: Summary;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ summary }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const cards = [
    {
      title: 'Entradas',
      value: summary.income,
      icon: '📈',
      color: '#4CAF50',
      bgColor: '#E8F5E8',
    },
    {
      title: 'Saídas',
      value: summary.expense,
      icon: '📉',
      color: '#F44336',
      bgColor: '#FFE8E8',
    },
    {
      title: 'Saldo',
      value: summary.balance,
      icon: '💰',
      color: summary.balance >= 0 ? '#2196F3' : '#FF9800',
      bgColor: summary.balance >= 0 ? '#E3F2FD' : '#FFF3E0',
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <div key={index} className="summary-card" style={{ backgroundColor: card.bgColor }}>
          <div className="card-header">
            <span className="card-icon" style={{ color: card.color }}>
              {card.icon}
            </span>
            <h3 className="card-title" style={{ color: card.color }}>
              {card.title}
            </h3>
          </div>
          <div className="card-value" style={{ color: card.color }}>
            {formatCurrency(card.value)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;