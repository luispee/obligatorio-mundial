# Desde plantilla Fullstack: React (Vite) + Flask + MySQL con Docker


---

## Configuración inicial mínima

1. **Instalar Docker**  
   - Descargar e instalar Docker Desktop (incluye Docker Engine y Docker Compose) desde [docker.com](https://www.docker.com/get-started).  
   - Verificar instalación:
     ```bash
     docker --version
     docker compose version
     ```
   - Abrir Docker Desktop


## Comandos para iniciar servicios

En la raíz del proyecto:
     ```bash
     docker compose up --build
     ```


## Accesos
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health DB: http://localhost:5000/dbcheck