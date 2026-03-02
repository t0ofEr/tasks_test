FROM node:20-alpine

WORKDIR /app

# Instalamos las dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]