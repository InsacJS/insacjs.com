# Archivo  `*.output.js`

Este archivo se encarga de definir el formato de los datos de salida de una petición.

```js
const { Field, THIS } = require('insac')

module.exports = (app) => {
  const OUTPUT = {}

  OUTPUT.listar = Field.group(app.API.models.libro, { ... })

  // <!-- [CLI] - [COMPONENT] --!> //

  return OUTPUT
}
```

Para crear un objeto de tipo `Field.group()`, revise la sección [FieldGroups](./doc/field#funcion-group)

**Nota.-** El flag `// <!-- [CLI] - [COMPONENT] --!> //` es utilizado por `insac-cli` para modificar el archivo.

**Ejemplos:**

```js
OUTPUT.get = Field.group(app.AUTH.models.usuario, [
  {
    id       : THIS(),
    username : THIS(),
    nombre   : THIS(),
    email    : THIS(),
    persona  : {
      id                  : THIS(),
      nombre              : THIS(),
      primer_apellido     : THIS(),
      segundo_apellido    : THIS(),
      documento_identidad : THIS(),
      email               : THIS(),
      direccion           : THIS(),
      telefono            : THIS(),
      administrador       : {
        id    : THIS(),
        cargo : THIS()
      }
    },
    roles: [
      {
        id      : THIS(),
        fid_rol : THIS(),
        rol     : {
          id     : THIS(),
          nombre : THIS(),
          peso   : THIS()
        }
      }
    ],
    _estado             : THIS(),
    _fecha_creacion     : THIS(),
    _fecha_modificacion : THIS()
  }
])
```

```js
OUTPUT.update = {
  usuario: Field.group(app.AUTH.models.usuario, {
    id       : THIS({ allowNull: false }),
    username : THIS(),
    password : THIS(),
    nombre   : THIS(),
    email    : THIS(),
    roles    : Field.ARRAY(Field.INTEGER(), { comment: `ID's de lod roles que tiene el usuario.` })
  }),
  id_administrador: Field.clone(app.AUTH.models.administrador.attributes.id)
}
```
