# 💰 Sistema de Controle Financeiro

Um sistema completo de controle financeiro pessoal com interface moderna e responsiva, desenvolvido com React (TypeScript) no frontend e Node.js (TypeScript) no backend.

## 🚀 Funcionalidades

### Autenticação
- ✅ Cadastro de novos usuários
- ✅ Login seguro com JWT
- ✅ Proteção de rotas privadas

### Transações Financeiras
- ✅ Adicionar transações (entradas/saídas)
- ✅ Editar transações existentes
- ✅ Excluir transações
- ✅ Categorias pré-definidas para entradas e saídas

### Dashboard Financeiro
- ✅ Cards de resumo financeiro (saldo, total de entradas, total de saídas)
- ✅ Gráfico de pizza - distribuição por tipo (entradas/saídas)
- ✅ Gráfico de barras - top 5 categorias mais utilizadas
- ✅ Lista detalhada de todas as transações

### Interface do Usuário
- ✅ Design moderno e responsivo
- ✅ Interface intuitiva e fácil de usar
- ✅ Formulários com validação
- ✅ Feedback visual para ações do usuário

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18 com TypeScript
- React Router DOM para navegação
- Axios para requisições HTTP
- Recharts para gráficos interativos
- CSS3 com design responsivo

### Backend
- Node.js com TypeScript
- Express.js para API REST
- SQLite3 para banco de dados
- JWT para autenticação
- Bcrypt.js para hash de senhas
- CORS para comunicação entre frontend e backend

## 📦 Instalação e Configuração

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone [url-do-repositorio]
cd sistema-controle-financeiro
```

2. **Configure o Backend**
```bash
cd backend
npm install
```

3. **Configure o Frontend**
```bash
cd ../frontend
npm install
```

4. **Configure as variáveis de ambiente**
O backend já vem com um arquivo `.env` configurado com:
```
JWT_SECRET=your-secret-key-here
PORT=5001
NODE_ENV=development
```

## 🚀 Como executar

### Executar o Backend
```bash
cd backend
npm run dev
```
O servidor backend iniciará na porta 5001.

### Executar o Frontend
```bash
cd frontend
npm start
```
O servidor frontend iniciará na porta 3000.

### Acessar a aplicação
Abra seu navegador e acesse: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
sistema-controle-financeiro/
├── backend/
│   ├── src/
│   │   ├── database.ts      # Configuração do SQLite
│   │   ├── server.ts        # Servidor Express
│   │   ├── middleware/
│   │   │   └── auth.ts      # Middleware de autenticação
│   │   └── routes/
│   │       ├── auth.ts      # Rotas de autenticação
│   │       └── transactions.ts # Rotas de transações
│   ├── .env                 # Variáveis de ambiente
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/        # Componentes React
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── SummaryCards.tsx
    │   │   ├── TransactionForm.tsx
    │   │   ├── TransactionList.tsx
    │   │   └── Charts.tsx
    │   ├── services/
    │   │   └── api.ts         # Serviço de API
    │   ├── App.tsx
    │   └── index.tsx
    ├── package.json
    └── tsconfig.json
```

## 🔒 Segurança

- Senhas são hasheadas usando bcrypt
- Autenticação baseada em JWT
- Validação de dados no frontend e backend
- Proteção contra SQL injection com queries parametrizadas

## 📊 Funcionalidades Detalhadas

### Dashboard
- **Resumo Financeiro**: Visualização rápida do saldo total, total de entradas e total de saídas
- **Gráficos Interativos**: 
  - Gráfico de pizza mostrando a distribuição entre entradas e saídas
  - Gráfico de barras mostrando as 5 categorias com maiores valores

### Gerenciamento de Transações
- **Adicionar Transações**: Formulário intuitivo com validação
- **Editar Transações**: Modal de edição fácil de usar
- **Excluir Transações**: Confirmação antes de excluir
- **Categorias**: Lista pré-definida de categorias para melhor organização

### Autenticação
- **Cadastro**: Novos usuários podem se cadastrar com nome, email e senha
- **Login**: Sistema seguro de login com geração de token JWT
- **Sessão**: Token armazenado no localStorage para manter a sessão

## 🎨 Design

- Interface moderna com gradientes e sombras
- Totalmente responsiva para dispositivos móveis
- Cores intuitivas: verde para entradas, vermelho para saídas
- Animações suaves para melhor experiência do usuário

## 🔧 API Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastrar novo usuário
- `POST /api/auth/login` - Fazer login

### Transações (requer autenticação)
- `GET /api/transactions` - Listar transações do usuário
- `POST /api/transactions` - Criar nova transação
- `PUT /api/transactions/:id` - Atualizar transação
- `DELETE /api/transactions/:id` - Excluir transação
- `GET /api/transactions/summary` - Obter resumo financeiro
- `GET /api/transactions/categories` - Obter categorias frequentes

## 📝 Notas Importantes

- O banco de dados SQLite é criado automaticamente na primeira execução
- As tabelas são criadas automaticamente pelo sistema
- O sistema está configurado para ambiente de desenvolvimento
- Para produção, ajuste as variáveis de ambiente e configure um banco de dados mais robusto

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

Desenvolvido com ❤️ para controle financeiro pessoal.