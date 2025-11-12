# 💰 Minhas Finanças

Aplicação completa de controle financeiro pessoal com interface moderna e responsiva. Frontend em React + TypeScript e backend em Node.js + Express + SQLite.

## 🚀 Funcionalidades

### Autenticação
- ✅ Cadastro de usuários
- ✅ Login seguro com JWT
- ✅ Proteção de rotas privadas

### Transações
- ✅ Adicionar, editar e excluir transações
- ✅ Tipos: entradas e saídas
- ✅ Categorias pré‑definidas para organização

### Dashboard Financeiro
- ✅ Cards de resumo (saldo, entradas, saídas)
- ✅ Gráficos: pizza por tipo, pizza por categoria, linha de tendência mensal, barras de comparação mensal
- ✅ Filtros por tipo, categoria e período com botão “Limpar filtros”
- ✅ Lista detalhada de transações

## 🛠️ Tecnologias

### Frontend
- React 18 + TypeScript
- Axios
- Recharts
- CSS responsivo

### Backend
- Node.js + TypeScript
- Express
- SQLite3
- JWT + bcrypt
- CORS

## 📦 Instalação e Configuração

### Pré‑requisitos
- Node.js 16+
- npm (ou yarn)

### Passos

1) Clone o repositório
```bash
git clone https://github.com/<seu-usuario>/minhas-financas.git
cd minhas-financas
```

2) Backend
```bash
cd backend
npm install
```

3) Frontend
```bash
cd ../frontend
npm install
```

4) Variáveis de ambiente
Crie `backend/.env` com:
```
JWT_SECRET=uma-chave-secreta-segura
PORT=5001
NODE_ENV=development
```
Opcional: crie `frontend/.env` se precisar parametrizar URL da API.

## 🚀 Execução

### Backend
```bash
cd backend
npm run dev
```
Servidor na porta `5001`.

### Frontend
```bash
cd frontend
npm start
```
Aplicação em `http://localhost:3000`.

## 📁 Estrutura

```
minhas-financas/
├── backend/
│   ├── src/
│   │   ├── database.ts
│   │   ├── server.ts
│   │   ├── middleware/
│   │   └── routes/
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   ├── App.tsx
    │   └── index.tsx
    ├── package.json
    └── tsconfig.json
```

## 🔒 Segurança
- Senhas com hash (bcrypt)
- JWT para autenticação
- Validação de dados
- Queries parametrizadas no banco

## 📊 Detalhes do Dashboard
- Resumo de saldo/entradas/saídas
- Gráficos de pizza (tipo e categoria)
- Tendência mensal (linha)
- Comparação mensal (barras)
- Filtros com botão de limpar

## 🔧 API (principais)

### Autenticação
- `POST /api/auth/register` — cadastrar
- `POST /api/auth/login` — login

### Transações (autenticado)
- `GET /api/transactions` — listar
- `POST /api/transactions` — criar
- `PUT /api/transactions/:id` — atualizar
- `DELETE /api/transactions/:id` — excluir
- `GET /api/transactions/summary` — resumo
- `GET /api/transactions/categories` — categorias frequentes

## 📝 Notas
- Banco SQLite criado automaticamente
- Tabelas geradas na primeira execução
- Configuração voltada a desenvolvimento

## 🤝 Contribuições
Contribuições são bem‑vindas via issues e pull requests.

## 📄 Licença
MIT

— Desenvolvido com ❤️ para controle financeiro pessoal.