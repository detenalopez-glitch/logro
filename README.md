# Logro - Gaming Tracker 🏆

Logro es una aplicación diseñada para gamers, *Trophy Hunters* y "completionists" que desean llevar un control unificado y centralizado de sus videojuegos y el porcentaje de logros alcanzados en distintas plataformas (Steam, PlayStation, Xbox, etc.).

## 🚀 URLs de Producción (Vercel)
- **Frontend:** *Pendiente de despliegue manual en Vercel*
- **Backend API:** *Pendiente de despliegue manual en Vercel*

## 🛠️ Stack Tecnológico

**Frontend:**
- React 18
- Vite
- TypeScript Estricto
- Tailwind CSS v4
- React Router DOM v7
- Arquitectura basada en Hooks (`useGames`, `useForm`) y Context API nativa.

**Backend (API REST):**
- Node.js
- Express
- TypeScript
- UUID (Gestión de IDs)

## 📋 Gestión del Proyecto
El flujo de desarrollo fue trackeado utilizando metodología Kanban.
- **Trello Tablero:** [Enlace a tu tablero Trello] *(Reemplazar con enlace real)*

## 📂 Documentación
Toda la arquitectura y toma de decisiones se encuentra documentada en la carpeta `/docs`:
- `/docs/idea.md` - Concepto inicial
- `/docs/design.md` y `/docs/components.md` - UI/UX y Sistema de Componentes
- `/docs/hooks.md` y `/docs/context.md` - State management
- `/docs/api.md` - Contratos de API
- `/docs/deployment.md` - Guías de despliegue
- `/docs/retrospective.md` - Reflexiones de cierre

## ⚙️ Desarrollo Local

### 1. Inicializar el Backend
```bash
cd server
npm install
npm run dev
```
La API levantará en `http://localhost:3001`

### 2. Inicializar el Frontend
Abre otra terminal en la raíz del proyecto:
```bash
npm install
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173`
