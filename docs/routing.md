# Enrutamiento (Routing)

La navegación de la aplicación está gestionada por **React Router** (v7+). Toda la configuración reside en `src/App.tsx` enrutando hacia los diferentes contenedores (`Pages`).

## Rutas Definidas

| Ruta | Componente | Descripción |
|------|------------|-------------|
| `/` | `Dashboard` | Pantalla de inicio con métricas, estadísticas, y un acceso rápido a los juegos recientes. |
| `/collection` | `GameCollection` | Vista detallada del catálogo de juegos, donde el usuario puede visualizar todas sus entradas. |
| `*` | `NotFound` | Página 404 (Not Found) tipo catch-all. Se renderiza cuando el usuario entra en una URL que no está definida. |

## Convenciones de Navegación
- Los enlaces dentro de la aplicación utilizan el componente `<Link>` de `react-router-dom` para no recargar la página.
- El componente principal `<Layout>` proporciona el Header general con la navegación persistente que se renderiza alrededor de las vistas principales.
