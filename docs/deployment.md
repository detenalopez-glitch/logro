# Guía de Despliegue (Fase 5)

Este proyecto está dividido en un Frontend (React/Vite) y un Backend (Express). Se ha diseñado para ser desplegado fácilmente en **Vercel** o plataformas similares.

## 1. Despliegue del Backend (Express)
El backend que se encuentra en la carpeta `server/` está configurado para Vercel Serverless Functions.

**Pasos:**
1. Crear un nuevo proyecto en Vercel.
2. Definir el _Root Directory_ como `server`.
3. Vercel detectará automáticamente el archivo `vercel.json` y compilará la aplicación exportada en `index.ts`.
4. Añadir las variables de entorno en la plataforma:
   - `CORS_ORIGIN`: URL de producción del frontend (ej. `https://logros-front.vercel.app`).
   - *Nota: `PORT` no es necesario en Vercel, es gestionado dinámicamente.*

## 2. Despliegue del Frontend (Vite)
El Frontend (carpeta raíz) se despliega como un sitio estático moderno.

**Pasos:**
1. Crear un nuevo proyecto en Vercel apuntando al mismo repositorio.
2. Definir el _Root Directory_ a la raíz (donde está el frontend).
3. Framework Preset: **Vite** (Vercel lo detecta automáticamente).
4. Build command: `npm run build` | Output directory: `dist`.
5. Añadir variable de entorno en Vercel:
   - `VITE_API_URL`: URL final de tu backend (ej. `https://logros-api.vercel.app/api/v1`).

## 3. Consideraciones de Seguridad
- El archivo `.env` está en el `.gitignore` por defecto para evitar filtración de variables de entorno. Las plantillas base están ubicadas en `.env.example`.
- El uso de `CORS_ORIGIN` en el backend restringe las llamadas HTTP únicamente al cliente oficial desplegado, previniendo abusos desde sitios de terceros.
