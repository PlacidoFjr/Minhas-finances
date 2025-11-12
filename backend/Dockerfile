# Dockerfile alternativo caso o Railway não detecte automaticamente
FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY src ./src

# Build do TypeScript
RUN npm run build

# Expor porta
EXPOSE 5000

# Comando de start
CMD ["npm", "start"]

