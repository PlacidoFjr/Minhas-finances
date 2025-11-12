import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import './Login.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.register(name, email, password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand">
          <h1>Finance Control</h1>
          <p>Sistema de Gestão Financeira</p>
        </div>
        <div className="auth-features">
          <div className="feature-item">
            <div>
              <h3>Segurança Empresarial</h3>
              <p>Plataforma segura para gestão financeira corporativa</p>
            </div>
          </div>
          <div className="feature-item">
            <div>
              <h3>Integração Completa</h3>
              <p>Conecte todas as suas contas e carteiras em um só lugar</p>
            </div>
          </div>
          <div className="feature-item">
            <div>
              <h3>Suporte Especializado</h3>
              <p>Equipe pronta para ajudar no que você precisar</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Crie sua conta</h2>
            <p>Preencha os dados para solicitar acesso</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="name">Nome Completo</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Digite seu nome completo"
                className="auth-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Corporativo</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@empresa.com"
                className="auth-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mínimo 6 caracteres"
                className="auth-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Senha</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirme sua senha"
                className="auth-input"
              />
            </div>
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Criando conta...' : 'Solicitar Acesso'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Já tem uma conta? <Link to="/login" className="auth-link">Entrar</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;