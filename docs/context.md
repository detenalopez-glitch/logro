# Context API

Para mantener el estado de la colección global sin recurrir a bibliotecas de terceros como Redux o Zustand en esta fase temprana, utilizamos **React Context**.

## `GameContext` y `GameProvider`
`GameContext` es responsable de proveer el estado global `games` hacia toda la aplicación.
Está compuesto por un `useReducer` interno en el `GameProvider`.

### Estado
El estado del contexto es un objeto:
```ts
interface GameState {
  games: GameProgress[];
}
```

### Reducer y Acciones
Las acciones permitidas son:
- `ADD_GAME`: Añade un juego nuevo al arreglo de juegos.
- `UPDATE_GAME`: Busca el juego por ID en el arreglo y lo sobreescribe con los nuevos datos.
- `DELETE_GAME`: Filtra el arreglo, removiendo el juego con el ID pasado por payload.
- `SET_GAMES`: Útil para la carga inicial o sincronización (ej. desde localStorage).

### Persistencia
El `GameProvider` contiene efectos (`useEffect`) que automáticamente:
1. Cargan los juegos de `localStorage` ('logros_games') al montar.
2. Guardan el estado en `localStorage` cada vez que este cambia, garantizando que el usuario no pierda los datos al recargar la página.
