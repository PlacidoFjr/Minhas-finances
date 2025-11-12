# 🚂 Deploy no Railway - Guia Rápido

## Configuração Automática

O projeto já está configurado para o Railway com:
- ✅ `nixpacks.toml` - Configuração de build
- ✅ `railway.json` - Configuração de deploy
- ✅ `package.json` com scripts corretos

## Passos no Railway

1. **Conecte o repositório GitHub**
2. **Configure o Root Directory**:
   - Vá em Settings → Source
   - Root Directory: `backend`
3. **Variáveis de Ambiente** (Settings → Variables):
   - `JWT_SECRET` = uma chave secreta qualquer (ex: `minha-chave-super-secreta-123`)
   - `PORT` = será definido automaticamente pelo Railway
   - `NODE_ENV` = `production`
4. **Deploy**: O Railway fará automaticamente!

## ⚠️ Importante

- O banco SQLite será criado automaticamente
- Em produção, considere migrar para PostgreSQL (Railway oferece grátis)
- Após o deploy, copie a URL e adicione `/api` no final para usar no Vercel

## Exemplo de URL

Se o Railway gerar: `https://seu-projeto.up.railway.app`
Use no Vercel: `https://seu-projeto.up.railway.app/api`

