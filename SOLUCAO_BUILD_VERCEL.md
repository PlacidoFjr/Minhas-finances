# 🔧 Solução: Build Failed no Vercel

## ❌ Problema
O comando `cd frontend && npm install && npm run build` está falhando.

## ✅ Soluções

### Opção 1: Configurar Root Directory no Vercel (RECOMENDADO)

1. No Vercel, vá em **Settings** → **General**
2. Encontre **"Root Directory"**
3. Defina como: `frontend`
4. **Remova** o `vercel.json` da raiz (ou deixe apenas as rewrites)
5. O Vercel detectará automaticamente que é um projeto React
6. Faça um novo deploy

### Opção 2: Usar vercel.json Simplificado

O `vercel.json` foi atualizado para usar `npm ci` (mais confiável). Se ainda não funcionar:

1. Delete o `vercel.json` da raiz
2. Crie um `vercel.json` dentro da pasta `frontend/`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

3. Configure Root Directory no Vercel como `frontend`
4. Faça novo deploy

### Opção 3: Build Manual via Settings

1. No Vercel: **Settings** → **Build & Development Settings**
2. **Root Directory**: `frontend`
3. **Framework Preset**: `Create React App`
4. **Build Command**: `npm run build` (sem o `cd frontend`)
5. **Output Directory**: `build` (sem o `frontend/`)
6. Salve e faça redeploy

## 🔍 Verificar Logs

Se ainda falhar, verifique os logs completos:
1. Clique em **"View Function Logs"** ou expanda os logs
2. Procure por erros específicos de:
   - TypeScript
   - Dependências faltando
   - Erros de sintaxe

## 📝 Checklist

- [ ] Root Directory configurado como `frontend` no Vercel
- [ ] `vercel.json` simplificado ou removido
- [ ] Build Command correto (sem `cd frontend` se Root Directory estiver configurado)
- [ ] Output Directory correto (`build` se Root Directory = `frontend`)

