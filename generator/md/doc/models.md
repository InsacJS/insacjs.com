# Carpeta `models`

Contiene archivos con extensión `.model.js`. Cada modelo representa a una tabla de la base de datos.

```txt
app
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ models
                          └─ persona.model.js
```

Modo de uso:

```js
const PERSONA = await app.AUTH.models.persona.findAll()
```

**Ejemplo.-** Archivo `persona.model.js`

```js
const { Field } = require('insac')

module.exports = (sequelize, Sequelize) => {
  const MODEL = sequelize.define('persona', {
    id: Field.ID({
      comment: 'ID persona.'
    }),
    nombre: Field.STRING({
      comment : 'Nombre completo de la persona.',
      example : 'John Smith'
    }),
    telefono: Field.STRING(20, {
      comment : 'Número de telefono o celular.',
      example : '78885768'
    }),
    email: Field.STRING({
      comment  : 'Dirección de correo electrónico.',
      example  : 'example@gmail.com',
      validate : { isEmail: true }
    }),
    _estado               : Field.STATUS(),
    _usuario_creacion     : Field.CREATED_USER(),
    _usuario_modificacion : Field.UPDATED_USER(),
    _usuario_eliminacion  : Field.DELETED_USER(),
    _fecha_creacion       : Field.CREATED_AT(),
    _fecha_modificacion   : Field.UPDATED_AT(),
    _fecha_eliminacion    : Field.DELETED_AT()
  }, {
    schema: 'auth'
  })

  MODEL.associate = (app) => {
    // TODO
  }

  return MODEL
}
```

Para definir los atributos de un modelo puede utilizar el [Objeto Field](./doc/field#objeto-field).

## Asociaciones

Es posible relacionar modelos de 1:1 (hasOne) y 1:N (hasMany).

Ejemplo.- Si dentro de un módulo `api` se tienen los modelos `libro`, `autor` y `persona`:

```txt
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│    LIBRO    │         │    AUTOR    |         │   PERSONA   │
├─────────────┤       1 ├─────────────┤       1 ├─────────────┤
│ id_libro    │ N  ┌────┤ id_autor    | 1  ┌────┤ id_persona  │
│ fid_autor   │<───┘    │ fid_persona │<───┘    │             │
└─────────────┘         └─────────────┘         └─────────────┘
```

Las asociaciones serían de la siguiente forma:

Archivo `persona.model.js`

```js
MODEL.associate = (app) => { }
```

Archivo `autor.model.js`

```js
MODEL.associate = (app) => {
  const AUTOR   = app.API.models.autor
  const PERSONA = app.API.models.persona

  AUTOR.belongsTo(PERSONA, { as: 'persona', foreignKey: { name: 'fid_persona', targetKey: 'id_persona', allowNull: false } })
  PERSONA.hasOne(AUTOR,    { as: 'autor',   foreignKey: { name: 'fid_persona' } })
}
```

Archivo `libro.model.js`

```js
MODEL.associate = (app) => {
  const LIBRO   = app.API.models.libro
  const AUTOR   = app.API.models.autor

  LIBRO.belongsTo(AUTOR, { as: 'autor',  foreignKey: { name: 'fid_autor', targetKey: 'id_autor' } })
  AUTOR.hasMany(LIBRO,   { as: 'libros', foreignKey: { name: 'fid_autor' } })
}
```

## Referencias externas

Puede encontrar mas información acerca de la definición de modelos en el siguiente enlace:

- [Sequelize - Model definition](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)
