# Carpeta `logs`

Contiene archivos con extensión `.log`. Estos archivos se van creando automáticamente cuando se realizan peticiones.

La ubicación de esta carpeta puede cambiarse con la variable de entorno `process.env.LOGS_PATH`

## Niveles de logs

| Nombre    | Nivel | Descripción                |
| --------- | ----- | -------------------------- |
| `fatal`   | `0`   | Mensajes críticos          |
| `error`   | `1`   | Mensajes de error          |
| `warn`    | `2`   | Mensajes de advertencia    |
| `notice`  | `3`   | Mensajes importantes       |
| `info`    | `4`   | Mensajes informativos      |
| `verbose` | `5`   | Mensajes detallados        |
| `debug`   | `6`   | Mensajes para el depurador |
| `silly`   | `7`   | Mensajes sin importancia   |

## Ficheros de logs

Estos pueden ser configurados utilizando el archivo [logger.config.js](./doc/config-logger). Por defecto, se registran los logs de los niveles `error`, `warn` e `info`.

```txt
app
  ├─ logs
        ├─ error
        │     └─ app.error.log
        ├─ info
        │     └─ app.info.log
        └─ warn
              └─ app.warn.log
```

## Logs por consola

La propiedad `app.logger` permite crear diferentes niveles de logs.

Modo de uso:

```js
app.logger.error(req, message, data)
```

**Ejemplos:**

Para una petición específica, desde un controlador:

```js
CONTROLLER.prueba = async (req, res, next) => {
  try {
    app.logger.error(req, 'Mensaje nivel error')
    app.logger.warn(req, 'Mensaje nivel warn')
    app.logger.info(req, 'Mensaje nivel info')

    const DATA = { idUsuario: 999 }
    app.logger.error(req, 'Mensaje nivel error con datos', DATA)
    app.logger.warn(req, 'Mensaje nivel warn con datos', DATA)
    app.logger.info(req, 'Mensaje nivel info con datos', DATA)

    return res.success200(null, 'ok')
  } catch (err) { return next(err) }
}
```

Desde cualquier otra ubicación:

```js
app.logger.error(null, 'Mensaje nivel error')
app.logger.warn(null, 'Mensaje nivel warn')
app.logger.info(null, 'Mensaje nivel info')
```
