# Sistema de Ticketing con Observabilidad

## BDII - Trabajo obligatorio 2026

Solución integral de Ticketing para la comercialización, transferencia y validación de entradas en estos eventos de alta concurrencia. Con un modelo de entrada dinámica para la validación basado en JWT, desplegada con Docker y herramientas de monitoreo y observabilidad open source.

---

## Consideraciones de Red

Para la correcta ejecución local del repositorio, clonar y crear archivo backend/.env con las credenciales proporcionadas.

Para ejecutar en red y conectar múltiples dispositivos, configurar frontend/.env con la IPv4 del dispositivo ejecutando el contenedor, los dispositivos deben estar en la misma red y se deben habilitar los puertos 5173 y 5001 en las configuraciones de firewall.

## Configuración inicial mínima

**Instalar Docker**
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

Una vez que los contenedores están en ejecución se puede acceder a los siguientes recursos.

| Componente | Servicio | URL de Acceso |
| :--- | :--- | :--- |
| **Frontend** | Interfaz de Usuario (Vite/React) | [http://localhost:5173](http://localhost:5173) |
| **Backend** | API REST (Flask) | [http://localhost:5001](http://localhost:5001) |
| **Health Check** | Estado de Conexión de la BD | [http://localhost:5001/dbcheck](http://localhost:5001/dbcheck) |
| **Grafana** | Visualización de Dashboards y Alertas | [http://localhost:3000](http://localhost:3000) |
| **Prometheus** | Servidor de Métricas Temporales | [http://localhost:9090](http://localhost:9090) |
| **MySQL Exporter** | Telemetría del Motor de Base de Datos | [http://localhost:9104/metrics](http://localhost:9104/metrics) |

## Generación de respaldo de la base de datos

En la raíz del proyecto:

```bash
    ./backup_db.sh
```
