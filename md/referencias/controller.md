# Archivo  `*.controller.js`

Este archivo se encarga de realizar la tarea principal de una petición.

```js
module.exports = (app) => {
  const CONTROLLER = {}

  CONTROLLER.obtener = async (req, res, next) => {
    try {
      const RESULT = {
        id     : 1,
        titulo : 'El codigo Da Vinci',
      }
      return res.success200(RESULT, 'Tarea completada exitosamente')
    } catch (err) { return next(err) }
  }

  // <!-- [CLI] - [COMPONENT] --!> //

  return CONTROLLER
}
```

Por convención, todos los controladores son funciones asíncronas y todas las tareas se realizan dentro de los bloques try catch para controlar cualquier tipo de error.

**Nota.-** El flag `// <!-- [CLI] - [COMPONENT] --!> //` es utilizado por `insac-cli` para modificar el archivo.

## Creación de respuestas

```js
res.success200(result, message, metadata) // OK
res.success201(result, message)           // CREATED
res.success204()                          // NO_CONTENT
```

Puede encontrar más información en la sección [Formato de respuesta](./referencias/response#respuestas-de-tipo-success)

## Transacciones

Si se realizan varias operaciones con la base de datos, dependiendo el caso, deberá considerarse el uso de transacciones.

Una transacción permite realizar varias operaciones con la base de datos y si alguna de estas falla se revierten todas, los cambios se registran unicamente cuando todas las operaciones finalizan sin errores.

```js
module.exports = (app) => {
  const CONTROLLER = {}

  CONTROLLER.update = async (req, res, next) => {
    try {
      await app.DB.sequelize.transaction(async (t) => {
        await app.AUTH.dao.usuario.findOne(t, ... )
        await app.AUTH.dao.estudiante.update(t, ... )
        await app.AUTH.dao.inscripcion.update(t, ... )
        await app.AUTH.dao.historial.update(t, ... )
      })
      return res.success204(null, 'ok')
    } catch (err) { return next(err) }
  }

  // <!-- [CLI] - [COMPONENT] --!> //

  return CONTROLLER
}
```

**Ejemplo:**

```js
CONTROLLER.eliminar = async (req, res, next) => {
  try {
    const ID_USUARIO_SESION   = req.session.usuario.id
    const ID_USUARIO          = req.params.id
    await app.DB.sequelize.transaction(async (t) => {
      const USUARIO = await app.AUTH.dao.usuario.findOne(t, { id: ID_USUARIO }, { id: ID_USUARIO_SESION }, ['persona.administrador', 'roles'], false)
      if (USUARIO.persona) {
        if (USUARIO.persona.administrador) {
          const ID_ADMINISTRADOR = USUARIO.persona.administrador.id
          await app.AUTH.dao.administrador.destroy(t, null, { id: ID_ADMINISTRADOR }, null, false)
          app.logger.info(req, `[Eliminación permanente] administrador [id: ${ID_ADMINISTRADOR})]`)
        }
        const ID_PERSONA = USUARIO.persona.id
        await app.AUTH.dao.persona.destroy(t, null, { id: ID_PERSONA }, null, false)
        app.logger.info(req, `[Eliminación permanente] persona [id: ${ID_PERSONA}]`)
      }
      if (USUARIO.roles) {
        for (let i in USUARIO.roles) {
          const rolUsuario = USUARIO.roles[i]
          await app.AUTH.dao.rol_usuario.destroy(t, null, { id: rolUsuario.id }, null, false)
          app.logger.info(req, `[Eliminación permanente] rol_usuario [id: ${rolUsuario.id}]`)
        }
      }
      await app.AUTH.dao.usuario.destroy(t, null, { id: USUARIO.id }, null, false)
      app.logger.info(req, `[Eliminación permanente] usuario [id: ${ID_USUARIO}]`)
    })
    res.success204()
  } catch (err) { return next(err) }
}
```
