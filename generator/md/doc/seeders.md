# Carpeta `seeders`

Contiene archivos con extensión `.seed.js`.

Utiliza un sistema de inserción de datos secuencial, con la que es posible detectar automáticamente las relaciones entre las tablas y crear los registros de manera ordenada incluso haciendo uso de un solo fichero.

```txt
app
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ seeders
                          ├─ production
                          │     └─ rol.seed.js
                          └─ rol.seed.js
```

**Ejemplo.-** Archivo `rol.seed.js`

```js
module.exports = (app) => {
  const DATA = [
    { nombre: 'sueradmin', peso: 10 },
    { nombre: 'admin', peso: 8 },
    { nombre: 'user', peso: 5 }
  ]
  return DATA
}
```

Modo de uso: Se ejecutan cuando se instala la aplicación con el siguiente comando:

```bash
npm run setup
```

Es posible controlar todo el proceso de instalación de la base de datos con la propiedad `onSetup` del archivo [database.config.js](./doc/config-database)

## Inserciones con el método `INSERT`

Este tipo de inserción soporta registros relacionados.

**Ejemplo.-** Archivo `rol.seed.js`

```js
module.exports = (app) => {
  const DATA = [
    {
      nombre   : 'superadmin',
      peso     : 10,
      usuarios : [
        {
          usuario: {
            username : '1000',
            password : app.AUTH.tools.util.md5('123'),
            persona  : {
              nombre    : 'John Smith',
              direccion : 'Av. del poeta, #56'
            }
          }
        }
      ]
    },
    {
      nombre   : 'admin',
      peso     : 8,
      usuarios : [
        {
          usuario: {
            username : '2000',
            password : app.AUTH.tools.util.md5('123'),
            persona  : {
              nombre        : 'John Doe',
              direccion     : 'Zona Sur, #68',
              administrador : { cargo: 'Encargado del sistema.' }
            }
          }
        }
      ]
    },
    {
      nombre   : 'user',
      peso     : 5,
      usuarios : [
        {
          usuario: {
            username : '3000',
            password : app.AUTH.tools.util.md5('123'),
            persona  : {
              nombre    : 'Rosa Flores',
              direccion : 'Zona los valles, #567.',
            }
          }
        },
        {
          usuario: {
            username : '4000',
            password : app.AUTH.tools.util.md5('123'),
            persona  : {
              nombre    : 'Anna Morales',
              direccion : 'Zona de obrajes, #586.',
            }
          }
        }
      ]
    }
  ]

  return DATA
}
```

## Inserciones con el método `BULK INSERT`

Con este método se pueden insertar grandes cantidades de datos, estos no deben incluir submodelos y además se deben asignar si o si las claves primarias y foráneas.

**Ejemplo.-** Archivo `rol.seed.js`

```js
module.exports = (app) => {
  const DATA = [
    { id: 1, nombre: 'superadmin', peso: 10 },
    { id: 2, nombre: 'admin', peso: 8 },
    { id: 3, nombre: 'user', peso: 5 }
  ]
  return DATA
}
```

## Carpeta `seeders/production`

Esta carpeta contiene los seeders que serán ejecutados en ambientes de producción.

Estos archivos se ejecutan con el siguiente comando:

```bash
npm run setup-production
```
