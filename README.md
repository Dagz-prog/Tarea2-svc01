# Proyecto Angular 17 - Administración de Productos y Categorías

## Descripción

Este proyecto es una aplicación web desarrollada en Angular 17 que permite la administración de productos y categorías. La aplicación consume una API CRUD generada en una tarea previa y está diseñada para cumplir con requisitos específicos, incluyendo roles de usuario y autenticación.

## Requisitos

1. **Estructura Angular 17**: La aplicación utiliza la estructura de Angular 17 provista por el profesor en las clases técnicas.
2. **Consumo de API CRUD**: La aplicación consume los métodos del API CRUD generado en la tarea técnica 1 mediante HTTP.
3. **Roles de Usuario**:
   - `SUPER-ADMIN-ROLE`
   - `USER`
4. **Administración de Entidades**:
   - Página para administrar productos.
   - Página para administrar categorías.
5. **Registro y Actualización de Entidades**:
   - Componente para registrar nuevos productos y categorías.
   - Reutilización del componente para actualizar ambas entidades.
6. **Autenticación**:
   - Inicio de sesión.
   - Registro de usuarios.
7. **Base de Datos Local**:
   - Registro de datos en una base de datos MySQL o MariaDB de forma local.
8. **Eliminación de Entidades**:
   - Funcionalidad para eliminar productos y categorías.
9. **Consulta de Entidades**:
   - Consulta de productos y categorías permitida para todos los usuarios autenticados.
10. **Restricciones de Acceso**:
    - Registro, actualización y borrado de productos y categorías solo permitidos para usuarios con rol `SUPER-ADMIN-ROLE`.
    - Visualización de productos y categorías para usuarios sin permisos de edición o eliminación.
11. **Administración de Usuarios**:
    - Página y componente para mostrar los usuarios registrados en el sistema.
    - Acceso restringido al componente de usuarios solo para el `SUPER-ADMIN-ROLE` tanto por URL como por menú.
