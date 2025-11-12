# 🚀 Deploy - Guia Simples

## ✅ Passo 1: Backend no Railway (Já Funcionando!)

Seu backend já está no Railway. Anote a URL:
- Exemplo: `https://seu-projeto.up.railway.app`

## ✅ Passo 2: Frontend no Vercel

### 2.1 Configurar Root Directory
1. Vercel → Projeto → **Settings** → **General**
2. **Root Directory**: `frontend`
3. **Salve**

### 2.2 Adicionar Variável de Ambiente
1. Vercel → **Settings** → **Environment Variables**
2. **Add New**:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://SEU-PROJETO.up.railway.app/api`
     - ⚠️ Substitua pela URL real do Railway
     - ⚠️ Adicione `/api` no final
   - Marque: Production, Preview, Development
3. **Save**

### 2.3 Fazer Deploy
1. **Deployments** → 3 pontinhos → **Redeploy**
2. Pronto! ✅

## 🔍 Verificar

Abra o site → F12 → Console → Deve mostrar requisições para Railway

