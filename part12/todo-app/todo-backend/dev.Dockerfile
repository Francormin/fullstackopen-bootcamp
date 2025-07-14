FROM node:20

WORKDIR /usr/src/app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala TODO (incluyendo devDependencies como nodemon)
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto de tu backend (asegurate que tu app escuche en 3000)
EXPOSE 3000

# Usa el script "dev" del package.json, que ya corre nodemon
CMD ["npm", "run", "dev"]
