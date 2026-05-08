# Testing & QA (Fase 5)

Este documento detalla el proceso de pruebas manuales y validación de calidad aplicado al proyecto "Logro" antes de su despliegue a producción.

## 1. Pruebas Funcionales (Manuales)
Se ejecutó un flujo E2E (End-to-End) comprobando las funciones core:

- **Listado Inicial**: Carga inicial sin juegos muestra correctamente el "Empty State" tanto en Dashboard como en Colección.
- **Creación de Juego (Validaciones)**: 
  - Intentar guardar un juego sin título activa el error visual.
  - Intentar asignar más logros obtenidos que los totales activa el `alert` de validación.
  - El botón se deshabilita y muestra "Guardando..." durante el fetch.
- **Visualización Reactiva**: Añadir un juego actualiza el Dashboard y las tarjetas sin necesidad de refrescar la pantalla gracias al `GameContext`.
- **Eliminación**: Confirmar el diálogo nativo borra el juego y recalcula instantáneamente los porcentajes de estadísticas.

## 2. Diseño Responsivo (UI/UX)
El frontend desarrollado con Tailwind CSS ha sido probado en resoluciones clave:

- **Desktop (1024px+)**: El Dashboard muestra hasta 4 `GameCard` por fila (`lg:grid-cols-3 xl:grid-cols-4`). Navbar expansivo.
- **Tablet (768px - 1023px)**: Las tarjetas colapsan a 2 columnas (`sm:grid-cols-2`). Formularios mantienen un tamaño cómodo.
- **Mobile (< 768px)**: Layout lineal de 1 sola columna. Elementos del Header se apilan si es necesario para evitar overflow horizontal.

## 3. Testing Técnico y Linter
- Ejecución de `npm run lint`: 0 errores.
- Ejecución de `npm run build` (tsc -b && vite build): 0 errores. Tipado TypeScript respetado al 100% usando importaciones aisladas de tipo.
- La consola del navegador fue revisada para asegurar que no existan warnings de React (como problemas de "key" en mapeos) ni errores de red 404 (salvo llamadas esperadas).
