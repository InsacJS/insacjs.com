# Carpeta `modules`

Contiene archivos con extensión `.module.js`.

```js
const { Module } = require('insac')

module.exports = (app) => {
  const API = new Module(app.config.API)

  // Adiciona carpetas personalizadas
  API.addComponent('mails', '.mail.js')
  API.addComponent('reports', '.report.js')
  API.addComponent('services', '.service.js')
  API.addComponent('storage', '.storage.js')

  return API
}
```

## Estructura básica de un módulo:

```txt
 ├─ src
       ├─ modules
             ├─ AUTH
                   ├─ config
                   │     ├─ auth.config.js
                   │     └─ auth.config.js.example
                   ├─ dao
                   │     └─ usuario.dao.js
                   ├─ hooks
                   │     ├─ auth.after.hook.js
                   │     └─ auth.before.hook.js
                   ├─ mails
                   │     └─ send.mail.js
                   ├─ models
                   │     └─ usuario.model.js
                   ├─ reports
                   │     └─ usuario.report.js
                   ├─ resources
                   │     └─ auth
                   │            └─ account
                   │                 ├─ account.controller.js
                   │                 ├─ account.input.js
                   │                 ├─ account.middleware.js
                   │                 ├─ account.output.js
                   │                 └─ account.route.js
                   ├─ seeders
                   │     ├─ production
                   │     │      └─ usuario.seed.js
                   │     └─ usuario.seed.js
                   ├─ services
                   │     └─ authServer.service.js
                   ├─ storage
                   │     └─ local.storage.js
                   ├─ tools
                   │     └─ util.tool.js
                   └─ auth.module.js
```

## Carpetas predefinidas

- [config](./referencias/config)
- [dao](./referencias/dao)
- [hooks](./referencias/hooks)
- [models](./referencias/models)
- [resource](./referencias/resource)
- [seeders](./referencias/seeders)
- [tools](./referencias/tools)

## Carpetas personalizadas

Para Acceder al contenido de estos ficheros, se sigue el siguiente patron:

```js
const RESULT = await app.MODULE_NAME.dirName.fileName.myFunction()
```

Puede encontrar mas información de este tipo de componentes en [Carpetas personalizadas](./referencias/component)
