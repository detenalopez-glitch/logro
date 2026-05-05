# Cliente API Frontend (Fase 4)

La comunicación con el backend se centraliza a través de un cliente fetch fuertemente tipado en `src/api/client.ts`.

## `fetchClient<T>`
Función genérica que envuelve la API `fetch` nativa del navegador.

**Responsabilidades:**
- Agrega cabeceras por defecto (`Content-Type: application/json`).
- Pre-fija todas las llamadas con la URL base (`http://localhost:3001/api/v1`).
- Maneja y tipa los errores a través de la clase custom `ApiError`. Si el backend responde con un status `!response.ok`, parsea el body para arrojar el mensaje de error original provisto por el servidor.
- Retorna siempre la respuesta tipada `<T>` o lanza un error tipado. **No se utiliza `any`**.

## `gamesApi` (`src/api/games.ts`)
Objeto que agrupa todos los endpoints específicos para la entidad Games. 
Usa `fetchClient` por debajo y garantiza que el input y el output coincidan estrictamente con las interfaces TypeScript.

**Métodos Disponibles:**
- `getAll()`: Retorna `Promise<GameProgress[]>`.
- `getById(id)`: Retorna `Promise<GameProgress>`.
- `create(data)`: Retorna `Promise<GameProgress>`. Recibe los campos básicos sin ID ni fechas.
- `update(id, data)`: Retorna `Promise<GameProgress>`.
- `delete(id)`: Retorna `Promise<{ message: string }>`.

## Integración con el Contexto y UI
El cliente NUNCA se llama directamente desde un componente visual. El flujo es:
1. `GameContext` (o `useGames`) invoca a `gamesApi`.
2. El Context maneja los estados reactivos: `loading: boolean` y `error: string | null`.
3. Los componentes UI (`Dashboard`, `GameCollection`) escuchan estos estados para mostrar spinners, placeholders de texto ("Cargando..."), o alertas visuales si ocurre un error de red.
