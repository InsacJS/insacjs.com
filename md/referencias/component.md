# Carpetas personalizadas.

Una carpeta personalizada, tiene la caracteristica de estar asociado a un tipo de fichero específico el cual se encarga de gestionar su propio espacio de trabajo.

```txt
app
  ├─ src
        ├─ modules
              ├─ API
                    ├─ mails
                    │     └─ send.mail.js
                    ├─ reports
                    │     └─ usuario.report.js
                    ├─ service
                    │     └─ authServer.service.js
                    ├─ storage
                          └─ local.storage.js
```

Ejemplo.- Archivo `send.mail.js`

```js
module.exports = (app) => {
  const SEND = {}

  SEND.recordarPassword = () => {
    // TODO
  }

  return SEND
}
```

Ejemplo.- Archivo `usuario.report.js`

```js
module.exports = (app) => {
  const USUARIO = {}

  USUARIO.crearReporteGeneral = () => {
    // TODO
  }

  return USUARIO
}
```

Ejemplo.- Archivo `authServer.service.js`

```js
module.exports = (app) => {
  const AUTH_SERVER = {}

  AUTH_SERVER.autenticar = () => {
    // TODO
  }

  return AUTH_SERVER
}
```

Ejemplo.- Archivo `local.storage.js`

```js
module.exports = (app) => {
  const LOCAL = {}

  LOCAL.guardarArchivo = () => {
    // TODO
  }

  return LOCAL
}
```

Adición de un componente personalizado a un módulo:

```js
const { Module } = require('insac')

module.exports = (app) => {
  const API = new Module(app.config.API)

  API.addComponent('mails', '.mail.js')
  API.addComponent('reports', '.report.js')
  API.addComponent('services', '.service.js')
  API.addComponent('storage', '.storage.js')

  return API
}
```

Modo de uso:

```js
await app.API.mails.send.recordarPassword()

await app.API.reports.usuario.crearReporteGeneral()

await app.API.service.authServer.autenticar()

await app.API.storage.local.guardarArchivo()
```
