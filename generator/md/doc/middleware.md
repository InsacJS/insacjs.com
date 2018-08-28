# Archivo  `*.middleware.js`

Este archivo contiene funciones que se ejecutan antes de realizar la tarea principal de una petición (antes de ejecutar los controladores).

```js
const { errors }   = require('insac')
const { NotFound } = errors

module.exports = (app) => {
  const MIDDLEWARE = {}

  MIDDLEWARE.obtener = [
    async (req, res, next) => {
      try {
        const ID_USUARIO = req.params.id
        if (!await app.AUTH.dao.usuario.findOne(null, { id: ID_USUARIO })) {
          throw new NotFound('No se encuentra el registro solicitado.')
        }
        return next()
      } catch (err) { return next(err) }
    }
  ]

  // <!-- [CLI] - [COMPONENT] --!> //

  return MIDDLEWARE
}
```

**Nota.-** El flag `// <!-- [CLI] - [COMPONENT] --!> //` es utilizado por `insac-cli` para modificar el archivo.

## Creación de errores

Puede encontrar más información en la sección [Respuestas de tipo error](./doc/response#respuestas-de-tipo-error)

**Ejemplos:**

```js
MIDDLEWARE.actualizar = [
  app.AUTH.autenticar(['superadmin', 'admin']),
  async (req, res, next) => {
    try {
      const ID_USUARIO_SESION = req.session.usuario.id
      const ID_USUARIO        = req.params.id
      const PERSONA           = req.body.persona || {}
      const USERNAME          = PERSONA.documento_identidad
      const IDS_ROLES         = req.body.roles
      if (!await app.AUTH.dao.usuario.findOne(null, { id: ID_USUARIO })) {
        throw new NotFound(`No se encuentra el registro del usuario que desea actualizar.`)
      }
      if (USERNAME && await app.AUTH.dao.usuario.findOne(null, { username: USERNAME }, { id: ID_USUARIO }, null, false)) {
        throw new Conflict(`El usuario ya se encuentra registrado.`)
      }
      if (PERSONA.email && await app.AUTH.dao.usuario.findOne(null, { email: PERSONA.email }, { id: ID_USUARIO }, null, false)) {
        throw new Conflict(`El email ya se encuentra registrado.`)
      }
      if (ID_USUARIO === ID_USUARIO_SESION) {
        throw new Conflict('No puede modificar su propia cuenta de usuario.')
      }
      return next()
    } catch (err) { return next(err) }
  }
]
```
