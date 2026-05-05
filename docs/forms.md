# Formularios Controlados

Los formularios en la aplicación están construidos siguiendo el enfoque de "formularios controlados" en React, manejando el estado desde un custom hook centralizado en lugar de depender de librerías externas (como react-hook-form o formik).

## Custom Hook `useForm`
El control del formulario, los cambios (onChange) y los errores, se derivan a `useForm`. 
Las validaciones se pasan como un diccionario de funciones al momento de inicializar el hook.

## `AddGameForm`
Formulario principal de la Fase 3, responsable de la creación de un nuevo juego (o edición futura).

### Validaciones implementadas:
- **Título**: Requerido. No puede ser una cadena vacía o estar compuesto solo por espacios.
- **Logros Totales**: Debe ser mayor o igual a 0.
- **Logros Obtenidos**: Debe ser mayor o igual a 0.
- **Lógica Combinada**: Los "logros obtenidos" no pueden ser mayores que los "logros totales" (se valida onSubmit).

### Manejo de Errores y UI
Cada campo maneja un borde rojo (`border-red-500`) y renderiza un mensaje explícito si existe el error correspondiente en el estado devuelto por `useForm`.

La ejecución de `addGame` solo se efectúa si todas las validaciones son exitosas (la función `validate()` devuelve true). Luego, la UI limpia los campos o cierra el modal (`onSuccess()`).
