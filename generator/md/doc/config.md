# Carpeta `config`

Contiene archivos con extensión `.config.js`. Algunos valores pueden ser modificados utilizando [Variables de entorno](./doc/env#variables-de-entorno), dando prioridad a estas últimas.

## Configuración a nivel de aplicación

```txt
app
  ├─ src
        ├─ config
              ├─ database.config.js
              ├─ database.config.js.example
              ├─ server.config.js
              ├─ server.config.js.example
              ├─ logger.config.js
              ├─ logger.config.js.example
              ├─ response.config.js
              ├─ response.config.js.example
              ├─ apidoc.config.js
              └─ apidoc.config.js.example
```

## Descripción del contenido

| Nombre               | Descripción                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `database.config.js` | Configuración de la base de datos. Ver: [Archivo database.config.js](./doc/config-database#archivo-databaseconfigjs) |
| `server.config.js`   | Configuración del servidor. Ver: [Archivo server.config.js](./doc/config-server#archivo-serverconfigjs) |
| `logger.config.js`   | Configuración de logger. Ver: [Archivo logger.config.js](./doc/config-logger#archivo-loggerconfigjs) |
| `response.config.js` | Configuración del formato de respuesta respuesta. Ver: [Archivo response.config.js](./doc/config-response#archivo-responseconfigjs) |
| `apidoc.config.js`   | Configuración del apidoc. Ver: [Archivo apidoc.config.js](./doc/config-apidoc#archivo-apidocconfigjs) |

## Configuración a nivel de módulos

```txt
app
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ config
                          ├─ auth.config.js
                          └─ auth.config.js.example
```

**Ejemplo.-** Archivo `auth.config.js`

```js
const AUTH = {
  secretKey: 'ClaveSecreta',
  mail: {
    apiKey: `SG.WOZmqfcJQAyXO1AeH1Gn9Q.umMZsv5hJje5R0_3RMSs8Z`
  }
}

module.exports = AUTH
```

**Ejemplo.-** Archivo `auth.config.js.example`

```txt
const AUTH = {
  secretKey: '<SECRET_KEY_VALUE>',
  mail: {
    apiKey: 'SG.WOZmqfcJ...'
  }
}

module.exports = AUTH
```

Modo de uso:

```js
const secretKey = app.config.AUTH.secretKey
const apiKey    = app.config.AUTH.mail.apiKey
```

## Archivos `*.config.js.example`

Estos archivos son ejemplos de configuración. Pueden ser guardados en el repositorio, ya que por defecto, los archivos `*.config.js` son excluidos al momento de hacer un commit.

Los archivos de configuración son excluidos por contener información sensible, por seguridad nunca deberían subirse valores como una API_KEY al repositorio, en lugar de ello es posible subir un ejemplo con un valor aleatorio.
