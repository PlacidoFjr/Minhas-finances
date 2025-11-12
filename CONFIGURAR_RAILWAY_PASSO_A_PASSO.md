# 🚂 Configurar Railway - Passo a Passo DETALHADO

## ⚠️ PROBLEMA: "Error creating build plan with Railpack"

Este erro acontece quando o Railway não consegue detectar automaticamente como fazer o build.

## ✅ SOLUÇÃO: Configuração Manual no Railway

### Passo 1: Acessar Settings do Projeto
1. No Railway, clique no seu projeto "Minhas-finances"
2. Clique em **"Settings"** (no menu lateral)

### Passo 2: Configurar Root Directory ⭐ **CRÍTICO**
1. Na seção **"Source"**, encontre **"Root Directory"**
2. **IMPORTANTE**: Digite exatamente: `backend`
3. Clique em **"Save"**

### Passo 3: Configurar Build Manualmente
1. Ainda em **Settings**, vá em **"Build"**
2. Em **"Build Command"**, digite:
   ```
   npm install && npm run build
   ```
3. Em **"Start Command"**, digite:
   ```
   npm start
   ```
4. Clique em **"Save"**

### Passo 4: Configurar Variáveis de Ambiente
1. Em **Settings**, vá em **"Variables"**
2. Clique em **"New Variable"**
3. Adicione:
   - **Name**: `JWT_SECRET`
   - **Value**: `sua-chave-secreta-super-segura-123` (qualquer string)
4. Clique em **"Add"**
5. (Opcional) Adicione:
   - **Name**: `NODE_ENV`
   - **Value**: `production`

### Passo 5: Fazer Novo Deploy
1. Vá em **"Deployments"** (menu lateral)
2. Clique nos **3 pontinhos** (⋯) do último deploy que falhou
3. Selecione **"Redeploy"**

## 🔍 Verificar se Funcionou

Após o deploy:
1. Vá em **"Deployments"**
2. O status deve estar **"SUCCESS"** (verde)
3. Clique no deploy para ver os logs
4. Procure por: `🚀 Servidor rodando na porta...`

## 📋 Checklist Completo

- [ ] Root Directory configurado como `backend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm start`
- [ ] Variável `JWT_SECRET` configurada
- [ ] Novo deploy feito
- [ ] Deploy com status SUCCESS

## 🆘 Se Ainda Não Funcionar

### Opção 1: Usar Dockerfile
O projeto tem um `Dockerfile` alternativo. No Railway:
1. Settings → Build
2. Builder: Selecione **"Dockerfile"**
3. Faça redeploy

### Opção 2: Deletar e Recriar o Projeto
1. Delete o projeto atual no Railway
2. Crie um novo projeto
3. Conecte o GitHub
4. **IMPORTANTE**: Configure Root Directory = `backend` ANTES do primeiro deploy
5. Configure as variáveis
6. Faça o deploy

## 📞 Próximos Passos Após Deploy Funcionar

1. Copie a URL do Railway (ex: `https://seu-projeto.up.railway.app`)
2. No Vercel, adicione variável:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://seu-projeto.up.railway.app/api` (com `/api` no final!)
3. Faça redeploy no Vercel

