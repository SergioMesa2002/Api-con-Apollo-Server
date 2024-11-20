# Taller GraphQL - Documentación de Queries y Mutations

Este archivo detalla las operaciones GraphQL implementadas para gestionar conductores y buses en el sistema.

---

## Tabla de Contenido

1. [Introducción](#introducción)
2. [Mutations](#mutations)
   - [Crear Conductor](#crear-conductor)
   - [Actualizar Conductor](#actualizar-conductor)
   - [Eliminar Conductor](#eliminar-conductor)
   - [Eliminar Buses](#eliminar-buses)
3. [Queries](#queries)
   - [Obtener Todos los Conductores](#obtener-todos-los-conductores)
4. [Notas](#notas)

---

## Introducción

El proyecto utiliza GraphQL para interactuar con datos relacionados con conductores y buses. Incluye operaciones para crear, actualizar, eliminar y consultar información.
instalar npm install
ejecutar con el comando node app.js
http://localhost:5000/graphql Dirreccion apolo server


---

## Mutaciones

### Crear Conductor

Esta operación permite agregar un nuevo conductor al sistema mediante su cédula, nombre y número de licencia.

```graphql
mutation {
    createDriver(
        cedula: "155151",
        name: "Juan Loreda",
        license: "A123456"
    ) {
        id
        cedula
        name
        license
    }
}

Actualizar Conductor
Permite modificar los datos de un conductor existente. Es necesario proporcionar el id del conductor y los nuevos valores de los campos a actualizar.

mutation {
    updateDriver(
        id: "670c3f17f57d0e793121b67c",
        name: "Sergio Gomez",
        cedula: "87654321",
        license: "B987654"
    ) {
        id
        cedula
        name
        license
    }
}

### Eliminar Conductor
Esta operación elimina un conductor del sistema con base en su id.

mutation {
    deleteDriver(id: "670d2cb9083fa8e56e010a1b") {
        message
    }
}
Obtener Todos los Conductores
Devuelve una lista con todos los conductores registrados en el sistema.

query {
    drivers {
        id
        cedula
        name
        license
    }
}



