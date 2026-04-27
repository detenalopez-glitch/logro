# Componentes de UI (Fase 2)

## `src/types/index.ts`
Contiene los contratos de datos base de la aplicación.
- `GameStatus`: Estados posibles ('backlog', 'playing', 'completed', 'platinum').
- `GameProgress`: Interfaz principal que define la estructura de un juego (ID, Título, Plataforma, Totales, Progreso, Estado).

## `src/components/ui/`
Aquí se almacenan los componentes reutilizables (presentacionales), completamente agnósticos al estado global y basados fuertemente en props.

### 1. `Button.tsx`
Botón estandarizado.
- **Props**: `variant` ('primary'|'secondary'|'danger'), `size` ('sm'|'md'|'lg'), `fullWidth` (boolean).
- **Uso**: Botones de submit, llamadas a la acción, cancelar en modales.

### 2. `ProgressBar.tsx`
Muestra visualmente el porcentaje de logros calculados en tiempo real.
- **Props**: `current` (número), `total` (número), `showLabel` (opcional).
- **Comportamiento**: Limita el renderizado visual a un máximo de 100%. Si el progreso es 100%, cambia a color amarillo/dorado (`isPlatinum`).

### 3. `GameCard.tsx`
Tarjeta que representa un juego en el Dashboard o el Catálogo.
- **Props**: `game` (objeto `GameProgress`), `onUpdate` y `onDelete` (callbacks).
- **Comportamiento**: Contiene lógica visual para mostrar badges de plataforma, un badge de estado del juego (con colores dinámicos), y renderiza la `ProgressBar` internamente.
- **Interacción**: Posee botones ocultos (Editar/Eliminar) que aparecen haciendo `hover` sobre la tarjeta.

### 4. `Modal.tsx`
Ventana emergente genérica para evitar que el usuario deba cambiar de página al hacer operaciones CRUD simples.
- **Props**: `isOpen`, `onClose`, `title`, `children`.
- **Comportamiento**: Se sobrepone a todo el contenido (`z-50`). Bloquea el scroll del `body` cuando se abre, y soporta cerrarse presionando la tecla `Escape`.

## Convenciones de Desarrollo
- **Tipado estricto**: Todo componente tiene una interfaz `NombreComponenteProps` explícita que extiende de `React.HTMLAttributes` cuando corresponda.
- **Tailwind-first**: Todo el diseño está hecho con clases utilitarias directamente dentro de los atributos `className`.
- **Accesibilidad (a11y)**: Se añadieron roles (`role="progressbar"`, `role="dialog"`) y `aria-labels` donde corresponde (ej: botón cerrar modal).
