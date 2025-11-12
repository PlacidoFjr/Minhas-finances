# 🔧 Solução para Erro "Error creating build plan with Railpack"

## ❌ Problema
O Railway não está conseguindo detectar como fazer o build do seu projeto.

## ✅ Solução

### 1. Configure o Root Directory no Railway

**IMPORTANTE**: O Railway precisa saber que o código está na pasta `backend`!

1. No Railway, vá em **Settings** → **Source**
2. Encontre **"Root Directory"**
3. Defina como: `backend`
4. Salve

### 2. Verifique as Configurações

O projeto já tem os arquivos necessários:
- ✅ `backend/nixpacks.toml` - Configuração de build
- ✅ `backend/railway.json` - Configuração de deploy  
- ✅ `backend/package.json` - Com scripts corretos

### 3. Faça um Novo Deploy

1. Vá em **Deployments**
2. Clique nos **3 pontinhos** do deploy que falhou
3. Selecione **"Redeploy"**

### 4. Se Ainda Não Funcionar

**Opção A: Deploy Manual via CLI**

```bash
# Instale o Railway CLI
npm i -g @railway/cli

# No diretório backend
cd backend
railway login
railway init
railway up
```

**Opção B: Configurar Build Manualmente**

No Railway:
1. Settings → Build
2. Build Command: `npm install && npm run build`
3. Start Command: `npm start`

## 📝 Checklist

- [ ] Root Directory configurado como `backend`
- [ ] Arquivos de configuração presentes (`nixpacks.toml`, `railway.json`)
- [ ] Variável `JWT_SECRET` configurada
- [ ] Novo deploy feito

## 🎯 Próximos Passos

Após o deploy funcionar:
1. Copie a URL do Railway (ex: `https://seu-projeto.up.railway.app`)
2. No Vercel, adicione variável: `REACT_APP_API_URL` = `https://seu-projeto.up.railway.app/api`
3. Faça redeploy no Vercel

