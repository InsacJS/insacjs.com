# Objeto Response

El formato de las respuestas pueden ser modificadas desde el archivo de configuración [response.config.js](./doc/config-response).

## Respuestas de tipo `success`

``` json
{
  "name": "ResponseHandlerSuccess",
  "status": "success",
  "type": "OK",
  "code": 200,
  "message": "La tarea ha sido completada exitosamente.",
  "data": [
    {
      "id": 1,
      "titulo": "El gato negro"
    }
  ],
  "metadata": {
    "count": 1000,
    "limit": 30,
    "page": 2,
    "start": 31,
    "end": 60
  }
}
```

| Campo            | Tipo     | Descripción                                                                                        |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `name`           | `String` | Nombre que identifica a la clase que creó la respuesta.                                            |
| `status`         | `String` | Palabra que indica que el proceso finalizó correctamente. Siempre será `success`                   |
| `type`           | `String` | Tipo de respuesta.                                                                                 |
| `code`           | `Number` | Código del resultado. Por defecto, está asociado al tipo de respuesta.                             |
| `message`        | `String` | Describe el resultado obtenido. **Puede mostrarse al cliente** como el título de una notificación. |
| `data`           | `Object` | Resultado.                                                                                         |
| `metadata`       | `Object` | Metadatos adicionales. [opcional]                                                                  |
| `metadata.count` | `Number` | Cantidad de registros existentes.                                                                  |
| `metadata.limit` | `Number` | Cantidad de archivos por página.                                                                   |
| `metadata.page`  | `Number` | Número de página.                                                                                  |
| `metadata.start` | `Number` | Posición que ocupa el primer registro devuelto. Comenzando desde el 1.                             |
| `metadata.end`   | `Number` | Posición que ocupa el último registro devuelto. Comenzando desde el 1.                             |

### Tipos de respuestas exitosas

| Tipo | Código | Titulo | Mensaje | Causa |
| ---- | ------ | ------ | ------- | ----- |
| `OK` | 200 | Éxito | La tarea ha sido completada exitosamente. | Ocurre cuando una petición finaliza correctamente. |
| `CREATED` | 201 | Éxito al crear | El recurso ha sido creado de manera exitosa. | Ocurre cuando una tarea finaliza correctamente y como resultado se ha creado un nuevo recurso. |
| `NO_CONTENT` | 204 | Éxito al procesar | La petición se ha completado con éxito pero su respuesta no tiene ningún contenido. | Ocurre cuando una petición finaliza correctamente pero no devuelve ningún resultado. |

### Ejemplo de creación de respuestas exitosas

```js
const { ResponseSuccess, successes } = require('insac')
const { Ok, Created, NoContent } = successes
```

Utilizando la función `success` del objeto `response` y la instancia de una clase de tipo `ResponseSuccess`:

```js
res.success(new ResponseSuccess(type, code, message, data, metadata))

res.success(new Ok(data, message, metadata))
res.success(new Created(data, message, metadata))
res.success(new NoContent())
```

Utilizando funciones `success` específicas del objeto `response`:

``` js
res.success200(data)
res.success200(data, message)
res.success200(data, message, metadata)

res.success201(data)
res.success201(data, message)

res.success204()
```

Utilizando la función `create` de la clase:

```js
let result

result = Ok.create(data, message, metadata)
result = Created.create(data, message)
result = NoContent.create()

res.success(result)
```

## Respuestas de tipo `error`

``` json
{  
  "name": "ResponseHandlerError",
  "status": "error",
  "type": "BAD_REQUEST",
  "code": 400,
  "message": "Petición incorrecta",
  "errors": [
    {
      "path": "path",
      "value": "value",
      "msg": "msg",
      "dev": "dev"
    }
  ]
}
```

| Campo          | Tipo       | Descripción                                                                   |
| -------------- | ---------- | ----------------------------------------------------------------------------- |
| `name`         | `String`   | Nombre que identifica a la clase que creó la respuesta.                       |
| `status`       | `String`   | Palabra que indica que el proceso finalizó con un error. Siempre será `error` |
| `type`         | `String`   | Tipo de respuesta.                                                            |
| `code`         | `Number`   | Código del resultado. Por defecto, está asociado al tipo de respuesta.        |
| `message`      | `String`   | Describe el tipo de error. **Puede mostrarse al cliente**                     |
| `errors`       | `Object[]` | Lista de errores.                                                             |
| `errors.path`  | `String`   | Ruta del campo que produjo el error. [opcional]                               |
| `errors.value` | `<value>`  | Valor del campo que produjo el error. [opcional]                              |
| `errors.msg`   | `String`   | Describe la causa del error. **Puede mostrarse al cliente**                   |
| `errors.dev`   | `String`   | Información para el desarrollador. [opcional]                                 |

### Tipos de errores

| Tipo | Código | Titulo | Mensaje | Causa |
| ---- | ------ | ------ | ------- | ----- |
| `BAD_REQUEST` | 400 | Petición incorrecta | Hubo un error al procesar su solicitud, revise el formato en el envío de datos e inténtelo nuevamente. | Ocurre cuando algún dato de entrada no tiene el formato correcto. |
| `UNAUTHORIZED` | 401 | Acceso no autorizado | Debe autenticarse para acceder al recurso. | Ocurre cuando se intenta acceder a un recurso privado. |
| `FORBIDDEN` | 403 | Acceso denegado | No cuenta con los privilegios suficientes para acceder al recurso. | Ocurre cuando se intenta acceder a un recurso privado, utilizando una credencial incorrecta. |
| `NOT_FOUND` | 404 | Recurso no disponible | El servidor no puede encontrar el recurso solicitado. | Ocurre generalmente cuando el registro no existe o ha sido eliminado. |
| `CONFLICT` | 409 | Conflicto | Hubo un error durante el proceso, inténtelo nuevamente. | Ocurre generalmente cuando el registro ha sido modificado y no se puede continuar con el proceso. |
| `PRECONDITION_FAILED` | 412 | Condición insuficiente | No se cumple con algunas condiciones que son necesarias para completar la tarea. | Ocurre cuando no se cumple con ciertas condiciones (validaciones lógicas), por lo general cuando los datos de entrada en conjunto no tienen un sentido lógico. |
| `INVALID_TOKEN` | 498 | Token inválido | El token es inválido | Ocurre generalmente cuando el token ha expirado. |
| `INTERNAL_SERVER` | 500 | Error interno | Hubo un error inesperado, inténtelo mas tarde. | Este error nunca debería ocurrir, generalmente son errores desconocidos que no han sido controlados. |

### Ejemplo de creación de respuestas con error

```js
const { ResponseError, errors} = require('insac')
const {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  PreconditionFailed,
  InvalidToken,
  InternalServer
} = errors
```

Utilizando la función `error` del objeto `response` y la instancia de una clase de tipo `ResponseError`:

```js
res.error(new ResponseError(type, code, message, errors, parent))
res.error(new BadRequest('msg'))
res.error(new BadRequest({ msg: 'msg', dev: 'dev' }))
res.error(new BadRequest([{ msg: 'msg1', dev: 'dev1' }, { msg: 'msg2', dev: 'dev2' }]))
```

Utilizando funciones `error` específicas del objeto `response`:

``` js
res.error400('msg1')
res.error400({ msg: 'msg1', dev: 'dev1' })
res.error400([{ msg: 'msg1', dev: 'dev1' }, { msg: 'msg2', dev: 'dev2' }])
```

Utilizando la función `create` de la clase:

```js
let err

err = BadRequest.create('msg1')
err = BadRequest.create({ msg: 'msg1', dev: 'dev1' })
err = BadRequest.create([{ msg: 'msg1', dev: 'dev1' }, { msg: 'msg2', dev: 'dev2' }])

res.error(err)
```

Errores de tipo `500`:

```js
const err = new Error()

// Errores producidos desde un controlador
res.error500(err)
res.error500(err, 'msg')

// Errores producidos desde un midleware
throw new InternalServer(err)
throw new InternalServer(err, 'msg')

// Errores producidos desde un controlador de errores
function (err, req, res, next) => {
  err = InternalServer.create(err)
  err = InternalServer.create(err, 'msg')

  res.error(err)
}
```
