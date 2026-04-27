# Diseño y Arquitectura: Logro (Gaming Tracker)

## 1. Estructura de Componentes Principales
El sistema utilizará una arquitectura basada en componentes reutilizables (UI) y contenedores (Features/Pages).

- **Páginas (`src/pages/`)**:
  - `Dashboard.tsx`: Vista principal con estadísticas generales y listado de juegos recientes.
  - `GameCollection.tsx`: Vista completa del catálogo con filtros (plataforma, estado).
  
- **Componentes Reutilizables (`src/components/ui/`)**:
  - `GameCard.tsx`: Tarjeta visual de un juego (título, plataforma, % de logros).
  - `ProgressBar.tsx`: Barra visual que indica el % completado.
  - `Modal.tsx`: Ventana emergente genérica para acciones (añadir, editar).
  - `Button.tsx`: Botón genérico estilizado con variantes (primario, secundario, peligro).

- **Formularios (`src/components/forms/`)**:
  - `AddGameForm.tsx`: Formulario para registrar o editar el progreso de un juego.

## 2. Estrategia de Gestión de Estado
Para la Fase 1/2 mantendremos el estado global de la colección de juegos usando **React Context API** (`src/context/GameContext.tsx`) combinado con `useReducer`. 
- **Razón**: Es nativo, ligero y suficiente para manejar un CRUD de juegos sin añadir dependencias extra como Redux o Zustand en esta etapa temprana.

## 3. Diseño de la API REST (Contratos y Rutas)
Aunque actualmente usemos datos mockeados en el cliente, la estructura de consumo HTTP seguirá la siguiente especificación RESTful bajo el prefijo `/api/v1/`:

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/v1/games` | `GET` | Obtiene la lista completa de juegos del usuario. |
| `/api/v1/games` | `POST` | Crea un nuevo registro de juego. |
| `/api/v1/games/:id` | `GET` | Obtiene los detalles de un juego específico. |
| `/api/v1/games/:id` | `PUT` | Actualiza progreso o estado de un juego. |
| `/api/v1/games/:id` | `DELETE` | Elimina el juego del tracker. |

### Contrato de Datos (Game)
```json
{
  "id": "uuid",
  "title": "Elden Ring",
  "platform": "PlayStation 5",
  "totalAchievements": 42,
  "earnedAchievements": 42,
  "status": "platinum",
  "createdAt": "2023-10-15T12:00:00Z"
}
```

## 4. Flujo de Datos (Frontend ↔ API)
1. **Acción de Usuario**: El usuario interactúa con la UI (Ej. Hace click en "Añadir Juego" y llena el `AddGameForm`).
2. **Contexto/Hook**: El formulario dispara la acción `addGame` desde el custom hook `useGames()`.
3. **Capa API (`src/api/`)**: La acción llama al servicio `gamesApi.post(newGame)`, ejecutando el `fetch/axios` hacia el servidor.
4. **Backend (Futuro)**: El servidor valida, guarda en BD y devuelve `201 Created` con el objeto.
5. **Actualización de Estado**: El `GameContext` actualiza el estado local (`state.games`) añadiendo el nuevo juego.
6. **Renderizado**: El componente `GameCollection` o `Dashboard` re-renderiza la lista de juegos y estadísticas automáticamente.
