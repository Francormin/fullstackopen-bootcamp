# 🧩 Todo App - Proyecto Fullstack con Docker (Dev y Prod)

Este es un proyecto fullstack que incluye:

- 🔧 Un **backend Node.js** (Express) con MongoDB y Redis
- 🎨 Un **frontend React** con Vite
- 🐳 Contenerización completa usando **Docker** y **Docker Compose**
- 🛠️ Separación entre entornos de desarrollo y producción
- 📂 Makefile con comandos útiles

## 📁 Estructura del proyecto

```
todo-app/
│
├── todo-backend/           # Backend Node.js (Express) + MongoDB + Redis
│   ├── Dockerfile          # Configuración de Docker para producción
│   ├── dev.Dockerfile      # Configuración de Docker para desarrollo
│   └── ...
│
├── todo-frontend/          # Frontend React (Vite)
│   ├── Dockerfile          # Configuración de Docker para producción
|   ├── dev.Dockerfile      # Configuración de Docker para desarrollo
│   └── ...
│
├── docker-compose.yml      # Entorno de producción
├── docker-compose.dev.yml  # Entorno de desarrollo
├── nginx.conf              # Configuración de NGINX para producción
├── nginx.dev.conf          # Configuración de NGINX para desarrollo
├── Makefile                # Comandos abreviados
└── README.md               # Documentación del proyecto
```

## 📦 Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (incluye Docker Engine + Docker
  Compose)
- Make (ya viene instalado en sistemas UNIX/macOS, en Windows podés usar WSL o Git Bash)

<br>

## ⚙️ Comandos útiles

Usamos un `Makefile` para simplificar los comandos más usados.

### 🧪 Entorno de desarrollo

```bash
make up-dev       # Levanta el entorno de desarrollo (con nodemon y vite)
make down-dev     # Detiene los contenedores de desarrollo
make build-dev    # Reconstruye las imágenes del entorno de desarrollo
```

### 🚀 Entorno de producción

```bash
make up-prod      # Levanta el entorno de producción (NGINX + static build)
make down-prod    # Detiene los contenedores de producción
make build-prod   # Reconstruye las imágenes del entorno de producción
```

### 🧼 Limpieza de volúmenes (opcional)

```bash
make prune        # Borra todos los volúmenes no usados
```

<br>

## 🌱 Entornos: desarrollo vs producción

### 💻 Desarrollo (`docker-compose.dev.yml`)

- Frontend con **Vite + hot reload**
- Backend con **Nodemon** para autorecarga
- Mongo y Redis en contenedores
- Ideal para debugging, testing y cambios en caliente
- Acceso: [http://localhost:5173](http://localhost:5173)

<br>

**Notas técnicas:**

- Se usa `nginx.dev.conf` como proxy para `/api` y soporte de WebSocket
- Vite se lanza con `--host` para exponerlo a otros contenedores (requerido para que NGINX lo
  alcance)

---

### 🌐 Producción (`docker-compose.yml`)

- Frontend se **compila** (`npm run build`)
- Archivos estáticos servidos por **NGINX**
- Backend sin autoreload, optimizado
- Mongo y Redis en contenedores separados
- Acceso: [http://localhost:8080](http://localhost:8080)

<br>

**Notas técnicas:**

- `nginx.conf` enruta `/api` al backend y sirve el frontend compilado
- Usa volumen intermedio `todo-frontend-build` para compartir el build de Vite
- Cada entorno usa su propio `--project-name` para evitar conflictos

<br>

## 📄 Archivos relevantes

- `Dockerfile` (prod) y `dev.Dockerfile` (dev): definen cómo construir y correr frontend/backend
- `nginx.conf` y `nginx.dev.conf`: configuran el proxy inverso para producción y desarrollo
- `Makefile`: simplifica comandos como `up-dev`, `build-prod`, etc.

<br>

## ✅ Próximos pasos

1️⃣ Elegí el entorno (`make up-dev` o `make up-prod`)  
2️⃣ Comenzá a trabajar desde el navegador (`localhost:5173` o `localhost:8080`)  
3️⃣ Hacé cambios, probá, iterá, disfrutá 😄

<br>

---

📬 ¿Comentarios, sugerencias o mejoras?  
¡Abrí un issue o pull request y charlamos!

Gracias por visitar el proyecto 🙌
