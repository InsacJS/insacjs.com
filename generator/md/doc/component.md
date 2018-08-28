# Componentes personalizados

Son carpetas que tienen la caracteristica de estar asociado a un tipo de fichero específico el cual se encarga de gestionar su propio espacio de trabajo.

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
                    │     └─ local.storage.js
                    ├─ custom
                          └─ task.custom.js
```

Ejemplo.- Archivo `send.mail.js`

```js
module.exports = (app) => {
  const SEND = {}

  SEND.recordarPassword = async () => {
    // TODO
  }

  return SEND
}
```

Ejemplo.- Archivo `usuario.report.js`

```js
module.exports = (app) => {
  const USUARIO = {}

  USUARIO.crearReporteGeneral = async () => {
    // TODO
  }

  return USUARIO
}
```

Ejemplo.- Archivo `authServer.service.js`

```js
module.exports = (app) => {
  const AUTH_SERVER = {}

  AUTH_SERVER.autenticar = async () => {
    // TODO
  }

  return AUTH_SERVER
}
```

Ejemplo.- Archivo `local.storage.js`

```js
module.exports = (app) => {
  const LOCAL = {}

  LOCAL.guardarArchivo = async () => {
    // TODO
  }

  return LOCAL
}
```

Ejemplo.- Archivo `task.custom.js`

```js
module.exports = (app) => {
  const TASK = {}

  TASK.inicializar = async () => {
    // TODO
  }

  return TASK
}
```

## Adición de componentes personalizados a un módulo

```js
const { Module } = require('insac')

module.exports = (app) => {
  const API = new Module(app.config.API)

  // Los archivos de estas carpetas se ejecutan después de cargar el módulo (onStart)
  API.addComponent('mails', '.mail.js')
  API.addComponent('reports', '.report.js')
  API.addComponent('services', '.service.js')
  API.addComponent('storage', '.storage.js')

  // Los archivos de esta carpeta se ejecutan después de iniciar(onInit), instalar (onSetup) y cargar (onStart) el módulo
  API.addComponent('custom' ,'.custom.js', { onInit: true, onSetup: true, onStart: true })

  return API
}
```

## Modo de uso

```js
const CUSTOM = app.MODULE_NAME.dirName.fileName
```

**Ejemplo:**

```js
await app.API.mails.send.recordarPassword()

await app.API.reports.usuario.crearReporteGeneral()

await app.API.service.authServer.autenticar()

await app.API.storage.local.guardarArchivo()

await app.API.custom.task.inicializar()
```
