# Retrospectiva y Conclusión

## El Camino (Fases 1 a 5)
"Logro" comenzó como una idea para unificar catálogos de videojuegos para completionists. A lo largo de las 5 fases, el desarrollo fue evolucionando sistemáticamente:

1. **Fundamentos**: Se estableció Vite, Tailwind y la metodología de trabajo en Trello, cimentando convenciones de TypeScript limpias.
2. **Diseño y Componentes**: Creación del UI System de "Logro", priorizando accesibilidad y un aspecto limpio (PascalCase, Tailwind utilitario).
3. **Lógica Avanzada en React**: Se dotó de vida a la UI. En lugar de abusar de Redux, se optó por un diseño de Context nativo acompañado por Hooks agnósticos (`useForm`) probando que React estándar es lo suficientemente potente para state management robusto.
4. **Backend Express**: Se desdobló la aplicación creando un Backend real para reemplazar `localStorage`. El backend mantuvo una arquitectura en capas que facilitará una futura conexión a Base de Datos.
5. **Pruebas y Despliegue**: Adaptación de los entornos (`.env`), resolución final de problemas de linting/verbatimModuleSyntax y configuración para plataformas en la nube (Vercel).

## Decisiones Técnicas y Lecciones Aprendidas (CONCEPTS > CODE)
- **Aislamiento de la lógica de red:** Crear el wrapper tipado `fetchClient` protegió al Frontend de fallos y forzó la predictibilidad sin el peso extra de Axios.
- **Arquitectura de Servidor Serverless:** Modificar `index.ts` en el backend para permitir tanto la escucha en un puerto tradicional local como la exportación para Vercel Functions fue crucial para un despliegue libre de dolores de cabeza.
- **Tipado Estricto:** Evitar el `any` a toda costa y lidiar con `verbatimModuleSyntax` de TS al principio pareció tedioso, pero garantizó 0 errores de compilación al finalizar el producto completo.

## Siguientes Pasos (A futuro)
- Mover el array en memoria del backend a una base de datos real (PostgreSQL usando Prisma o MongoDB con Mongoose).
- Implementar autenticación real (JWT).
- Integración con APIs de terceros (Steam, PSN) para automatizar el registro de logros.
