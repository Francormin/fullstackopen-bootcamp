FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

# Cambia npm ci a npm install ya que vamos a estar en modo de desarrollo
RUN npm install

COPY . .

# npm run dev es el comando para iniciar la aplicación en modo de desarrollo
# Los parámetros adicionales -- --host son necesarios para exponer el servidor de desarrollo y hacerlo visible fuera de la red Docker. Por defecto, el servidor de desarrollo solo se expone a localhost, y a pesar de que accedemos al frontend todavía usando la dirección de localhost, en realidad está conectado a la red Docker.
CMD ["npm", "run", "dev", "--", "--host"]
