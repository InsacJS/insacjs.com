# Archivo  `*.input.js`

Este archivo se encarga de definir el formato de los datos de entrada de una petición.

```js
const { Field, THIS } = require('insac')

module.exports = (app) => {
  const INPUT = {}

  INPUT.listar = {
    headers : Field.group(null, { ... }),
    params  : Field.group(app.API.models.libro, { ... }),
    query   : Field.group(app.API.models.libro, { ... }),
    body    : Field.group(app.API.models.libro, { ... })
  }

  // <!-- [CLI] - [COMPONENT] --!> //

  return INPUT
}
```

Para crear un objeto de tipo `Field.group()`, revise la sección [FieldGroups](./doc/field#funcion-group)

**Nota.-** El flag `// <!-- [CLI] - [COMPONENT] --!> //` es utilizado por `insac-cli` para modificar el archivo.

**Ejemplos:**

```js
Field.use('BEARER_AUTHORIZATION', Field.TEXT({
  comment   : 'Credenciales del acceso. <code>Bearer [accessToken]</code>',
  example   : 'Bearer s83hs7.sdf423.f23f',
  allowNull : false
}))

INPUT.get = {
  headers: {
    authorization: Field.BEARER_AUTHORIZATION()
  },
  query: {
    fields : Field.FIELDS(),
    order  : Field.ORDER(),
    limit  : Field.LIMIT(),
    page   : Field.PAGE()
  }
}
```

```js
INPUT.getId = {
  headers: {
    authorization: Field.BEARER_AUTHORIZATION()
  },
  query: {
    fields: Field.FIELDS()
  },
  params: Field.group(app.AUTH.models.usuario, {
    id: THIS({ allowNull: false })
  })
}
```

```js
INPUT.update = {
  headers: {
    authorization: Field.BEARER_AUTHORIZATION()
  },
  params: Field.group(app.AUTH.models.usuario, {
    id: THIS({ allowNull: false })
  }),
  body: Field.group(app.AUTH.models.usuario, {
    persona: {
      nombre              : THIS(),
      primer_apellido     : THIS(),
      segundo_apellido    : THIS(),
      documento_identidad : THIS({ allowNull: false, allowNullObj: false }),
      email               : THIS(),
      direccion           : THIS(),
      telefono            : THIS()
    },
    administrador: Field.group(app.AUTH.models.administrador, {
      cargo: THIS()
    }),
    roles: Field.ARRAY(Field.INTEGER(), { comment: `ID's de los roles del usuario.`, allowNull: false })
  })
}
```
