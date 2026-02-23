# CatApp

Aplicación fullstack para explorar razas de gatos, visualizar imágenes y consultar información detallada consumiendo [The Cat API](https://thecatapi.com/).

## Stack

| Capa | Tecnología |
|------|-----------|
| **Frontend** | Angular 18, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express 5, TypeScript |
| **Base de datos** | MongoDB 7 (Mongoose) |
| **Contenedores** | Docker, Docker Compose, Nginx |

## Arquitectura

```
cat-app/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración (DB, HTTP client, JWT, env)
│   │   ├── controllers/     # Controladores HTTP
│   │   ├── dtos/            # Esquemas de validación (Zod)
│   │   ├── errors/          # Jerarquía de errores custom
│   │   ├── interfaces/      # Contratos TypeScript
│   │   ├── middlewares/      # Auth, validación, error handler
│   │   ├── models/          # Modelos Mongoose
│   │   ├── routes/          # Definición de rutas
│   │   ├── services/        # Lógica de negocio
│   │   └── _tests_/         # Tests unitarios (Jest)
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/app/
│   │   ├── core/            # Auth service, guard, interceptor
│   │   ├── features/        # Componentes por vista (home, breeds, login, register, profile)
│   │   └── shared/          # Servicios, interfaces y componentes reutilizables
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

## Funcionalidades

- **Home**: Lista desplegable de razas, carrusel de imágenes e información detallada de la raza seleccionada.
- **Breeds Table**: Tabla con datos relevantes de todas las razas y filtro de búsqueda por texto.
- **Login / Register**: Autenticación con JWT y almacenamiento en MongoDB.
- **Profile**: Vista protegida por guard que muestra la información del usuario logueado.

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.

## Cómo ejecutar con Docker

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd cat-app
```

### 2. Configurar variables de entorno

Crear el archivo `backend/.env` a partir del ejemplo:

```bash
cp backend/.env.example backend/.env
```

Editar `backend/.env` con los valores reales:

```env
PORT=3000
MONGODB_URI=mongodb://mongo:27017/catapp
CAT_API_KEY=live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP
JWT_SECRET=una_clave_secreta_segura
```

> **Importante**: `MONGODB_URI` debe apuntar a `mongo` (nombre del servicio en Docker Compose), no a `localhost`.

### 3. Levantar los contenedores

```bash
docker compose up --build
```

Esto construye y levanta los 3 servicios:

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **frontend** | [http://localhost:4200](http://localhost:4200) | Angular app servida por Nginx |
| **backend** | [http://localhost:3000](http://localhost:3000) | API REST con Express |
| **mongo** | `27017` | Base de datos MongoDB |

### 4. Abrir la aplicación

Ir a [http://localhost:4200](http://localhost:4200) en el navegador. La app redirige al login; registrar un usuario para acceder.

### 5. Detener los contenedores

```bash
docker compose down
```

Para eliminar también los datos de MongoDB:

```bash
docker compose down -v
```

## Ejecución sin Docker (desarrollo)

### Backend

```bash
cd backend
cp .env.example .env    # Configurar con MONGODB_URI=mongodb://localhost:27017/catapp
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

La app estará disponible en [http://localhost:4200](http://localhost:4200) y el backend en [http://localhost:3000](http://localhost:3000).

## Tests

```bash
# Backend (Jest) — 26 tests
cd backend && npm test

# Frontend (Karma/Jasmine) — 37 tests
cd frontend && npm test
```
