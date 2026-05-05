# OpenCode Instructions for 'logro'

## Technology Stack
- **TypeScript / JavaScript**
- **Python**

## Workflow & Conventions
- **Strict TDD & Linting**: Write tests before or alongside implementation. All code must pass strict linting.
- **Fast Prototyping**: Iterate quickly to deliver functional prototypes while maintaining code quality and test coverage.

## Agent Guidelines
- **Setup (If missing)**: Proactively set up appropriate linting and testing tools (e.g., `pytest`/`ruff` for Python, `jest`/`vitest` + `eslint`/`prettier` for TypeScript) when introducing new code.
- **Verification**: Always run tests and linters before concluding a task. Do not assume code works without executing the test suite.
- **Boundaries**: Maintain clear architectural boundaries between the Python and TypeScript components if they are in the same repository.

## Fase 4 — Backend y capa de red

### Objetivo
Implementar el backend con Express y conectarlo al frontend mediante un cliente API tipado.

### Tareas
1. Crear backend en carpeta server/ con arquitectura: routes/, controllers/, services/, config/
2. Exponer endpoints REST con códigos HTTP correctos (200, 201, 400, 404, 500)
3. Documentar endpoints en docs/api.md con ejemplos de request/response
4. Crear cliente API tipado en src/api/client.ts usando fetch o axios
5. Definir interfaces TypeScript para todas las respuestas de la API
6. Gestionar los tres estados de red en la UI: loading, data, error
7. Usar la API como única fuente de verdad (no LocalStorage para datos del backend)
8. Documentar la capa de red en docs/api-client.md

### Convenciones
- Arquitectura por capas estricta: routes solo enrutan, controllers orquestan, services tienen la lógica
- Todos los endpoints bajo /api/v1/
- El cliente de API siempre devuelve tipos, nunca any
- Manejo de errores centralizado