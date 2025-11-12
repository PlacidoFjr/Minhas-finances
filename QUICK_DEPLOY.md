# ⚡ Deploy Rápido - Passo a Passo

## 🎯 Problema
O frontend está no Vercel, mas ainda aponta para `localhost:5000`, que não funciona em produção.

## ✅ Solução Rápida (5 minutos)

### 1. Hospedar Backend no Railway (Mais Fácil)

1. Acesse: https://railway.app
2. Faça login com GitHub
3. Clique em **"New Project"** → **"Deploy from GitHub repo"**
4. Selecione seu repositório `Minhas-finances`
5. Configure:
   - **Root Directory**: `backend`
   - Railway detecta automaticamente e faz o build
6. Após o deploy, copie a URL (ex: `https://seu-projeto.up.railway.app`)

### 2. Configurar Variável no Vercel

1. Acesse: https://vercel.com
2. Vá no seu projeto → **Settings** → **Environment Variables**
3. Adicione:
   ```
   Name: REACT_APP_API_URL
   Value: https://seu-projeto.up.railway.app/api
   ```
   ⚠️ **IMPORTANTE**: Adicione `/api` no final da URL!
4. Vá em **Deployments** → Clique nos 3 pontos → **Redeploy**

### 3. Pronto! 🎉

Agora o frontend vai se conectar ao backend em produção.

## 🔍 Verificar se Funcionou

1. Abra o console do navegador (F12)
2. Vá na aba **Network**
3. Faça login ou qualquer ação
4. Verifique se as requisições estão indo para a URL do Railway (não localhost)

## ⚠️ Problemas Comuns

### Erro CORS
- No Railway, adicione variável de ambiente:
  - `FRONTEND_URL=https://seu-projeto.vercel.app`

### Erro 404
- Verifique se a URL no Vercel termina com `/api`
- Exemplo correto: `https://backend.railway.app/api`
- Exemplo errado: `https://backend.railway.app`

### Backend não inicia
- Verifique os logs no Railway
- Certifique-se que o build está funcionando: `npm run build`

