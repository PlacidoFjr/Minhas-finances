# 🤔 Por que precisa hospedar em lugares diferentes?

## Explicação Simples

### O Problema:
- **Vercel** = Otimizado para **frontend** (React) e **serverless functions** (funções que rodam sob demanda)
- **Backend Express** = Precisa de um **servidor Node.js rodando 24/7** (sempre ativo)

### Por que não funciona junto?

1. **Vercel não mantém servidores sempre rodando**
   - Ele só executa código quando alguém acessa (serverless)
   - Seu backend Express precisa estar sempre "escutando" requisições

2. **SQLite não funciona bem em serverless**
   - SQLite salva dados em arquivo local
   - Em serverless, cada execução é "limpa" (sem estado persistente)
   - Os dados seriam perdidos a cada requisição

## ✅ Soluções (Escolha uma)

### Opção 1: Railway (MAIS FÁCIL - Recomendado) ⭐
- **Tempo**: 5 minutos
- **Custo**: Grátis (com limites)
- **Por quê**: Railway é feito exatamente para isso - hospedar backends Node.js
- **Como**: Conecta GitHub, seleciona pasta `backend`, pronto!

### Opção 2: Render (Alternativa)
- Similar ao Railway
- Também grátis com limites

### Opção 3: Tudo no Vercel (Mais Trabalho)
- Converter backend para serverless functions
- **PROBLEMA**: Precisa trocar SQLite por banco em nuvem (PostgreSQL, MongoDB)
- **Trabalho**: Muito código para reescrever

## 🎯 Recomendação

**Use Railway para o backend** porque:
- ✅ É grátis
- ✅ É fácil (5 minutos)
- ✅ Funciona perfeitamente com seu código atual
- ✅ Não precisa mudar nada no código
- ✅ Tem PostgreSQL grátis se quiser migrar depois

## 📝 Resumo

**Não é que "precisa" hospedar separado** - é que:
- Vercel = Frontend/Serverless (não mantém servidor sempre rodando)
- Backend Express = Precisa de servidor sempre rodando
- Railway/Render = Feitos para backends (mantém servidor sempre rodando)

É como ter uma **loja física** (backend sempre aberto) e um **delivery** (frontend que só funciona quando alguém pede).

