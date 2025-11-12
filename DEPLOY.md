# 🚀 Guia de Deploy - Minhas Finanças

## Problema Atual
O frontend está no Vercel, mas o backend precisa estar hospedado em outro lugar.

## Soluções

### Opção 1: Hospedar Backend Separadamente (Recomendado)

#### 1.1 Railway (Mais Fácil)
1. Acesse [Railway.app](https://railway.app)
2. Conecte seu repositório GitHub
3. Selecione a pasta `backend`
4. Railway detecta automaticamente e faz o deploy
5. Copie a URL gerada (ex: `https://seu-projeto.railway.app`)

#### 1.2 Render
1. Acesse [Render.com](https://render.com)
2. Crie um novo "Web Service"
3. Conecte o repositório e selecione a pasta `backend`
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Copie a URL gerada

#### 1.3 Heroku
1. Instale Heroku CLI
2. No diretório `backend`:
   ```bash
   heroku create seu-projeto-backend
   git push heroku main
   ```

### 2. Configurar Variável de Ambiente no Vercel

1. Acesse seu projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: URL do seu backend (ex: `https://seu-projeto.railway.app/api`)
4. Faça um novo deploy

### Opção 2: Converter Backend para Serverless Functions (Vercel)

Se preferir tudo no Vercel, precisamos converter o backend Express para serverless functions.

## ⚠️ Importante

- O SQLite não funciona bem em ambientes serverless (sem estado persistente)
- Recomendamos usar PostgreSQL ou MongoDB para produção
- Railway oferece PostgreSQL gratuito

## 📝 Checklist

- [ ] Backend hospedado (Railway/Render/Heroku)
- [ ] Variável `REACT_APP_API_URL` configurada no Vercel
- [ ] CORS configurado no backend para aceitar requisições do Vercel
- [ ] Novo deploy feito no Vercel

