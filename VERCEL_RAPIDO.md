# 🚀 Vercel - Solução Rápida

## ⚠️ Problema: 404 no Vercel

O frontend não está se conectando ao backend no Railway.

## ✅ Solução em 3 Passos

### 1️⃣ Copiar URL do Railway
- No Railway: Settings → Networking
- Copie a URL (ex: `https://seu-projeto.up.railway.app`)
- **ADICIONE `/api` no final**: `https://seu-projeto.up.railway.app/api`

### 2️⃣ Configurar no Vercel
1. Vercel → Seu Projeto → **Settings** → **Environment Variables**
2. **Add New**:
   - Key: `REACT_APP_API_URL`
   - Value: `https://seu-projeto.up.railway.app/api` (com /api!)
   - Marque: Production, Preview, Development
3. **Save**

### 3️⃣ Fazer Redeploy
1. **Deployments** → 3 pontinhos → **Redeploy**
2. ⚠️ **IMPORTANTE**: Variáveis só aplicam em novos deploys!

## ✅ Verificar
- Abra o site
- F12 → Console
- Deve mostrar requisições para Railway (não localhost)

## 🔧 Se ainda não funcionar

### No Railway, adicione variável CORS:
- Name: `FRONTEND_URL`
- Value: URL do seu Vercel (ex: `https://seu-projeto.vercel.app`)

