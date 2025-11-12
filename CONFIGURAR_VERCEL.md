# ⚡ Configurar Vercel - Passo a Passo

## ❌ Problema: Erro 404 no Vercel

O frontend está no Vercel, mas não consegue se conectar ao backend no Railway.

## ✅ Solução: Configurar Variável de Ambiente

### Passo 1: Obter URL do Railway

1. No Railway, vá no seu projeto
2. Clique em **"Settings"** → **"Networking"**
3. Encontre a seção **"Public Domain"** ou **"Generate Domain"**
4. Copie a URL gerada (ex: `https://seu-projeto.up.railway.app`)
5. **IMPORTANTE**: Adicione `/api` no final!
   - URL correta: `https://seu-projeto.up.railway.app/api`
   - ❌ Errado: `https://seu-projeto.up.railway.app` (sem /api)

### Passo 2: Configurar Variável no Vercel

1. Acesse https://vercel.com
2. Vá no seu projeto **"Minhas-finances"**
3. Clique em **"Settings"** (no topo)
4. No menu lateral, clique em **"Environment Variables"**
5. Clique em **"Add New"**
6. Preencha:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://seu-projeto.up.railway.app/api` (URL do Railway + /api)
   - **Environment**: Marque todas as opções (Production, Preview, Development)
7. Clique em **"Save"**

### Passo 3: Fazer Redeploy no Vercel

**IMPORTANTE**: Variáveis de ambiente só são aplicadas em novos deploys!

1. Vá em **"Deployments"** (no topo)
2. Clique nos **3 pontinhos** (⋯) do último deploy
3. Selecione **"Redeploy"**
4. Aguarde o deploy terminar

### Passo 4: Verificar se Funcionou

1. Abra o site no Vercel
2. Abra o **Console do Navegador** (F12 → Console)
3. Tente fazer login ou qualquer ação
4. Verifique se as requisições estão indo para a URL do Railway (não localhost)

## 🔍 Verificar Configuração

### No Console do Navegador, você deve ver:

Se estiver funcionando:
- Requisições para: `https://seu-projeto.up.railway.app/api/auth/login`

Se NÃO estiver funcionando:
- Requisições para: `http://localhost:5000/api/auth/login` ❌

## ⚠️ Problemas Comuns

### Erro CORS
**Solução**: No Railway, adicione variável:
- **Name**: `FRONTEND_URL`
- **Value**: URL do seu Vercel (ex: `https://seu-projeto.vercel.app`)

### Ainda mostra localhost
**Solução**: 
1. Verifique se a variável `REACT_APP_API_URL` está configurada
2. **Faça um novo deploy** (variáveis só aplicam em novos deploys)
3. Limpe o cache do navegador (Ctrl+Shift+R)

### Erro 404 nas rotas do frontend
**Solução**: O `vercel.json` já está configurado corretamente. Se ainda não funcionar:
1. Verifique se o build está gerando a pasta `frontend/build`
2. Verifique se o `outputDirectory` no `vercel.json` está correto

## 📋 Checklist

- [ ] URL do Railway copiada (com `/api` no final)
- [ ] Variável `REACT_APP_API_URL` configurada no Vercel
- [ ] Variável marcada para todos os ambientes (Production, Preview, Development)
- [ ] Novo deploy feito no Vercel
- [ ] Console do navegador mostra requisições para Railway (não localhost)
- [ ] Variável `FRONTEND_URL` configurada no Railway (para CORS)

