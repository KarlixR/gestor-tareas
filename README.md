# Gestor de tareas

Aplicación web para registrar, organizar y gestionar tareas diarias, desarrollada con **React** y **Vite** como ejercicio de frontend. Los usuarios pueden crear una cuenta, iniciar sesión y administrar sus propias tareas: crearlas, editarlas, eliminarlas, cambiarles el estado, buscarlas y filtrarlas.

## Funcionalidades

- **Registro e inicio de sesión:** cada persona crea su cuenta y accede a sus tareas personales. La sesión se mantiene aunque se recargue la página.
- **Creación de tareas:** con título, descripción, fecha de vencimiento y prioridad (baja, media o alta).
- **Visualización por estado:** las tareas se muestran en tres columnas: pendiente, en progreso y completada, con un contador en cada una.
- **Edición y eliminación:** se puede modificar cualquier tarea o eliminarla (con confirmación previa).
- **Marcar como completada:** con un botón directo o cambiando el estado desde el selector.
- **Búsqueda y filtros:** búsqueda por título o descripción (sin distinguir mayúsculas) y filtros por estado y prioridad, que se pueden combinar.
- **Diseño adaptable:** las columnas se acomodan lado a lado en pantallas anchas y se apilan en pantallas pequeñas.

## Tecnologías

- React (componentes funcionales y hooks `useState`)
- Vite
- CSS puro (Flexbox y Grid)
- `localStorage` del navegador para guardar usuarios, sesión y tareas

## Cómo ejecutarlo

Requisitos: tener [Node.js](https://nodejs.org) instalado.

```bash
git clone https://github.com/KarlixR/gestor-tareas.git
cd gestor-tareas
npm install
npm run dev
```

Luego abre en el navegador la dirección que aparece en la terminal (normalmente `http://localhost:5173/`).

Para generar la versión de producción:

```bash
npm run build
```

## Estructura del proyecto

```
src/
├── componentes/   Piezas reutilizables de la interfaz
│   ├── formularioTareas.jsx   Formulario para crear y editar tareas
│   ├── filtros.jsx            Barra de búsqueda y filtros
│   ├── columnaTareas.jsx      Columna de tareas de un estado
│   └── tareaIndividual.jsx    Tarjeta de una tarea
├── paginas/       Pantallas completas
│   ├── login.jsx
│   ├── registro.jsx
│   └── tareas.jsx
├── servicios/     Lógica de datos (sin interfaz)
│   ├── autenticacion.js       Registro, login, logout y sesión
│   └── tareas.js              Crear, leer, editar y eliminar tareas
├── App.jsx        Decide qué pantalla mostrar
├── main.jsx
└── index.css      Estilos de toda la aplicación
```

## Decisiones de diseño

- **Separación por responsabilidades:** los componentes solo muestran información y avisan de lo que ocurre; la lógica de guardar y leer datos vive en la carpeta `servicios`. Si en el futuro se reemplaza el `localStorage` por un backend, solo habría que modificar esa carpeta.
- **Sin librerías extra:** para navegar entre login, registro y tareas se usa el estado de React en lugar de una librería de rutas, y los estilos están en un solo archivo CSS, para mantener el proyecto simple.
- **Un solo formulario:** el mismo componente sirve para crear y para editar tareas, según reciba o no datos iniciales.

## Limitaciones

Este proyecto es un ejercicio de frontend, así que **no tiene backend ni base de datos**:

- Los usuarios, las contraseñas y las tareas se guardan en el `localStorage` del navegador. Esto solo sirve para simular la autenticación.
- Las contraseñas se guardan **sin cifrar**, algo que nunca debe hacerse en una aplicación real. En un proyecto de verdad, la autenticación se haría en un servidor, guardando las contraseñas con hash.
- Los datos pertenecen a cada navegador: no se comparten entre dispositivos ni se recuperan si se borra el almacenamiento del navegador.

## Posibles mejoras

- Conectar la aplicación a un backend con base de datos y autenticación real.
- Ordenar las tareas por fecha de vencimiento y resaltar las vencidas.
- Arrastrar y soltar tareas entre columnas.