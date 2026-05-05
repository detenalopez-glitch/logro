# API Backend - Logros (Fase 4)

El backend expone una serie de endpoints RESTful para la gestión del catálogo de juegos, montados por defecto bajo la ruta `/api/v1/`.

## Endpoints de Juegos (`/api/v1/games`)

### Obtener todos los juegos
- **Método**: `GET`
- **Ruta**: `/api/v1/games`
- **Respuesta Exitosa** (`200 OK`):
  ```json
  [
    {
      "id": "uuid-1234",
      "title": "Hollow Knight",
      "platform": "PC",
      "totalAchievements": 63,
      "earnedAchievements": 63,
      "status": "platinum",
      "createdAt": "2023-10-15T12:00:00.000Z",
      "updatedAt": "2023-10-16T12:00:00.000Z"
    }
  ]
  ```

### Obtener un juego por ID
- **Método**: `GET`
- **Ruta**: `/api/v1/games/:id`
- **Respuesta Exitosa** (`200 OK`): Objeto GameProgress.
- **Error** (`404 Not Found`): `{"error": "Juego no encontrado"}`

### Crear un nuevo juego
- **Método**: `POST`
- **Ruta**: `/api/v1/games`
- **Body**: 
  ```json
  {
    "title": "Elden Ring",
    "platform": "PS5",
    "totalAchievements": 42,
    "earnedAchievements": 10,
    "status": "playing"
  }
  ```
- **Respuesta Exitosa** (`201 Created`): Objeto GameProgress creado (incluyendo `id`, `createdAt`, `updatedAt`).
- **Error** (`400 Bad Request`): Si faltan campos requeridos o las validaciones fallan (ej. logros ganados > totales).

### Actualizar un juego
- **Método**: `PUT`
- **Ruta**: `/api/v1/games/:id`
- **Body**: Cualquier campo parcial (Partial de CreateGameDto).
- **Respuesta Exitosa** (`200 OK`): Objeto actualizado.

### Eliminar un juego
- **Método**: `DELETE`
- **Ruta**: `/api/v1/games/:id`
- **Respuesta Exitosa** (`200 OK`): `{"message": "Juego eliminado correctamente"}`

## Manejo de Errores Globales
Cualquier error inesperado en el servidor será capturado por el middleware global y retornará:
- **Status**: `500 Internal Server Error`
- **Body**: `{"error": "Error interno del servidor", "details": "..."}`
