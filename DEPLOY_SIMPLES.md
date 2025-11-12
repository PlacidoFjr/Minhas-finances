# 🚀 Deploy Simples - Passo a Passo

## ✅ Backend no Railway (Já Funcionando!)

O backend já está no Railway. Copie a URL:
- Exemplo: `https://seu-projeto.up.railway.app`
- **IMPORTANTE**: Você vai usar essa URL no passo 2!

## ✅ Frontend no Vercel

### Passo 1: Configurar Root Directory
1. Vercel → Seu Projeto → **Settings** → **General**
2. **Root Directory**: `frontend`
3. Salve

### Passo 2: Configurar Variável de Ambiente
1. Vercel → **Settings** → **Environment Variables**
2. Clique em **"Add New"**
3. Preencha:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://SEU-PROJETO.up.railway.app/api` 
     - ⚠️ Substitua `SEU-PROJETO` pela URL real do Railway!
     - ⚠️ Adicione `/api` no final!
   - Marque todas: ✅ Production ✅ Preview ✅ Development
4. Clique em **"Save"**

### Passo 3: Fazer Deploy
1. Vá em **Deployments**
2. Clique nos **3 pontinhos** (⋯) → **Redeploy**
3. Aguarde terminar

## ✅ Pronto!

Agora o frontend vai se conectar ao backend automaticamente!

## 🔍 Verificar se Funcionou

1. Abra o site no Vercel
2. Pressione **F12** → Aba **Console**
3. Tente fazer login
4. Deve aparecer requisições para a URL do Railway (não localhost)

## ⚠️ Se Ainda Não Funcionar

### No Railway, adicione variável CORS:
1. Railway → **Settings** → **Variables**
2. Adicione:
   - **Name**: `FRONTEND_URL`
   - **Value**: URL do seu Vercel (ex: `https://seu-projeto.vercel.app`)

