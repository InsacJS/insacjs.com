# Carpeta `dao`

Contiene los archivos con extensión `.dao.js`.

Un DAO (Data Access Object) es un archivo que proporciona una interfaz para interactuar con la base de datos. Por convención, cualquier operación con la base de datos debe realizarse a través de este fichero y no asi desde los modelos.

```txt
app
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ dao
                          └─ persona.dao.js
```

Modo de uso:
```js
const PERSONA = await app.AUTH.dao.persona.findAll()
```

**Ejemplo.-** Archivo `persona.dao.js`

```js
const { Dao } = require('insac')

module.exports = (app) => {
  const PERSONA = app.AUTH.models.persona
  const DAO     = new Dao(PERSONA)

  // |=============================================================|
  // |----------------- FUNCIONES PREDEFINIDAS --------------------|
  // |=============================================================|

  // DAO.findOne         = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.findAll         = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.count           = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.findAndCountAll = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.create          = (t, data)                                      => {}   : Promise
  // DAO.update          = (t, data, where, not, paranoid = true)         => {}   : Promise
  // DAO.destroy         = (t, data, where, not, paranoid = true)         => {}   : Promise
  // DAO.restore         = (t, data, where, not)                          => {}   : Promise

  // |=============================================================|
  // |----------------- FUNCIONES PERSONALIZADAS ------------------|
  // |=============================================================|

  // TODO

  return DAO
}
```

## Funciones predefinidas

```js
DAO.findOne         = (t, where, not, include = [], paranoid = true) => {}   : Promise
DAO.findAll         = (t, where, not, include = [], paranoid = true) => {}   : Promise
DAO.count           = (t, where, not, include = [], paranoid = true) => {}   : Promise
DAO.findAndCountAll = (t, where, not, include = [], paranoid = true) => {}   : Promise
DAO.create          = (t, data)                                      => {}   : Promise
DAO.update          = (t, data, where, not, paranoid = true)         => {}   : Promise
DAO.destroy         = (t, data, where, not, paranoid = true)         => {}   : Promise
DAO.restore         = (t, data, where, not)                          => {}   : Promise
```

## Funciones especiales

```js
DAO._findOne         = (t, options) => {}   : Promise
DAO._findAll         = (t, options) => {}   : Promise
DAO._count           = (t, options) => {}   : Promise
DAO._findAndCountAll = (t, options) => {}   : Promise
DAO._create          = (t, options) => {}   : Promise
DAO._update          = (t, options) => {}   : Promise
DAO._destroy         = (t, options) => {}   : Promise
DAO._restore         = (t, options) => {}   : Promise
```

## Descripción de los parámetros

| Parámetro  | Tipo          | Descripción                                      | Valor por defecto | Ejemplo                                      |
| ---------- | ------------- | ------------------------------------------------ | ----------------- | -------------------------------------------- |
| `t`        | `Transaction` | Transacción                                      | `null`            | `findOne(t)`                                 |
| `data`     | `Object`      | Datos para crear o modificar.                    | `null`            | `create(null, { nombre: 'John' })`           |
| `where`    | `Object`      | Opción de consulta where.                        | `null`            | `findOne(null, { id: 1 })`                   |
| `not`      | `Object`      | Opción de consulta not.                          | `null`            | `findAll(null, null, { id: 1 })`             |
| `include`  | `String[]`    | Associaciones a incluir.                         | `[]`              | `findAll(null, null, null, ['usuario.rol'])` |
| `paranoid` | `Boolean`     | Indica si se excluirán los registros eliminados. | `true`            | `findAll(null, null, null, null, false)`     |
| `options`  | `Object`      | Consulta Sequelize.                              | `null`            | `_findOne(null, { where: { id: 1 } }`        |

Modo de uso: Sin transacciones

```js
const PERSONA  = await app.AUTH.dao.persona.findOne(null, { id: 1 })
const USUARIO  = await app.AUTH.dao.usuario.findOne(null, { id: ID_USUARIO }, { id: ID_SESION })

const PERSONAS = await app.AUTH.dao.personas.findAll(null, null, null, null, false)

const PERSONAS = await app.AUTH.dao.personas.findAll(null, null, null, ['usuario'])
const PERSONAS = await app.AUTH.dao.personas.findAll(null, null, null, ['usuario.rol'])

const USUARIOS = await app.AUTH.dao.personas.findAll(null, { nombre: 'John' }, null, ['rol'])
```

Modo de uso: Con transacciones

```js
await app.DB.sequelize.transaction(async (t) => {
  const NUEVO_USUARIO = await app.AUTH.dao.usuario.create(t, { username: 'est' })
  const NUEVA_PERSONA = await app.AUTH.dao.persona.create(t, { nombre: 'John', fid_usuario: NUEVO_USUARIO.id })

  await app.AUTH.dao.persona.update(t, { nombre: 'John Smith', _usuario_modificacion: ID_SESION }, { id: ID_PERSONA })

  await app.AUTH.dao.persona.destroy(t, { _usuario_eliminacion: ID_SESION }, { fid_usuario: ID_USUARIO })
  await app.AUTH.dao.usuario.destroy(t, { _usuario_eliminacion: ID_SESION }, { id: ID_USUARIO })

  await app.AUTH.dao.usuario.restore(t, { _usuario_eliminacion: null }, { id: ID_USUARIO } )
})
```

Moo de uso: Funciones especiales

```js
const OPTIONS = {
  attributes: [
    'titulo',
    'precio'
  ],
  include: [
    {
      attributes: [
        'nombre'
      ],
      association: 'autor'
    }
  ],
  limit: 50,
  offset: 0,
  order: [
    [
      'autor',
      'nombre',
      'DESC'
    ]
  ]
}
const LIBROS = await app.AUTH.dao.libro._findAndCountAll(null, OPTIONS)
```

**Nota.-** Este tipo de consultas es utilizada por una [Ruta con Sistema de filtros](./doc/route-filter).

## Referencias externas

Para realizar consultas mas avanzadas, consulte las siguitentes páginas:

- [Sequelize - Model usage](http://docs.sequelizejs.com/manual/tutorial/models-usage.html)
- [Sequelize - Querying](http://docs.sequelizejs.com/manual/tutorial/querying.html)
