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

## Fase 1 — Fundamentos y arranque

### Objetivo
Sentar las bases del proyecto: metodología de trabajo, idea, organización y setup técnico.

### Tareas
1. Investigar Agile, Scrum y Kanban. Guardar en docs/agile.md
2. Definir la idea del proyecto: problema, usuario objetivo, funcionalidades. Guardar en docs/idea.md
3. Crear tablero Trello con columnas: Backlog, Todo, In Progress, Review, Done
4. Crear proyecto Vite + React + TypeScript, instalar Tailwind CSS y React Router
5. Crear estructura de carpetas: src/components/, src/pages/, src/hooks/, src/types/, src/utils/, src/context/, src/api/
6. Inicializar Git y hacer primer commit
7. Añadir enlace del tablero en README.md
8. Documentar organización en docs/project-management.md

### Convenciones
- Commits en inglés, formato conventional commits (feat:, docs:, chore:)
- Toda documentación va en docs/
- El tablero Trello debe estar actualizado en cada sesión