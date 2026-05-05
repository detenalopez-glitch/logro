# Hooks (Custom Hooks)

En la aplicación "Logro", utilizamos custom hooks para abstraer la lógica compleja y hacer que nuestros componentes sean más limpios y declarativos.

## `useGames`
Este hook maneja toda la lógica relacionada a la colección de juegos. Debe ser usado dentro de un componente que esté envuelto en `GameProvider`.

**Funcionalidades:**
- `games`: Retorna la lista de todos los juegos actuales.
- `stats`: Calcula en tiempo real las estadísticas (total de juegos, platinos, porcentaje promedio).
- `addGame`: Permite agregar un juego nuevo, generándole un UUID y timestamps automáticamente.
- `updateGame`: Actualiza la información de un juego existente.
- `deleteGame`: Elimina un juego según su ID.

## `useForm`
Un hook genérico, independiente del dominio, diseñado para manejar cualquier tipo de formulario en la aplicación.

**Funcionalidades:**
- Soporte para un estado inicial tipado (`values`).
- Validación síncrona pasando un objeto con funciones de regla (`validationRules`).
- Retorna el objeto `errors` para mostrar mensajes en pantalla.
- Contiene funciones helper como `handleChange`, `resetForm` y `validate`.
- Tipado estricto para aprovechar TypeScript en el manejo de keys.
