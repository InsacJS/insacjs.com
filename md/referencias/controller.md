# Archivo  `*.controller.js`

Este archivo se encarga de realizar la tarea principal de una petición.

```js
module.exports = (app) => {
  const CONTROLLER = {}

  CONTROLLER.getId = async (req, res, next) => {
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

**Nota.-** El flag `// <!-- [CLI] - [COMPONENT] --!> //` es utilizado por `insac-cli` para modificar el archivo.

## Tipos de respuesta

```js
res.success200(result, message, metadata) // OK
res.success201(result, message)           // CREATED
res.success204()                          // NO_CONTENT
```

## Objeto `req.options`

Todos los controladores tienen acceso a un objeto `options` que se encuentra en el `req` de la petición. Este objeto puede ser utilizado por Sequelize para realizar una consulta con la base de datos.

```js
CONTROLLER.listar = async (req, res, next) => {
  try {
    const OPTIONS = req.options
    const RESULTADO = await app.AUTH.dao.usuario._findAndCountAll(null, OPTIONS)
    return res.success200(RESULTADO.rows, 'La lista de usuarios ha sido obtenida con éxito.', util.metadata(req, RESULTADO))
  } catch (err) { return next(err) }
}
```

Esto permite aplicar algunos filtros básicos al momento de realizar la petición. Ver: `Sistema de filtros`.
