# Carpeta `modules`

Contiene todos los módulos de la aplicación.

## Estructura básica de un módulo:

```txt
app
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
                    ├─ models
                    │     └─ usuario.model.js
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
                    ├─ tools
                    │     └─ util.tool.js
                    └─ auth.module.js
```

## Descripción del contenido

| Nombre           | Descripción                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `config`           | Contiene los archivos de configuración del módulo. Ver: [Configuración a nivel de módulos](./doc/config#configuracion-a-nivel-de-modulos)                                                                       |
| `dao`            | Contiene los archivos dao que se utilizan para realizar operaciones con la base de datos. Ver: [Carpeta dao](./doc/dao#carpeta-dao) |
| `hooks`   | Contiene archivos que se ejecutan antes y después de cargar el módulo. Ver: [Hooks a nivel de módulos](./doc/hooks#hooks-a-nivel-de-los-modulos)                                                   |
| `models`         | Contiene todos los modelos. Ver: [Carpeta models](./doc/models#carpeta-models) |
| `resources`      | Contiene todos los recursos. Ver: [Carpeta resources](./doc/resources#carpeta-resources) |
| `seeders`        | Contiene archivos seeders. Ver: [Carpeta seeders](./doc/seeders#carpeta-seeders) |
| `tools`          | Contiene archivos utilitarios. Ver: [Carpeta tools](./doc/tools#carpeta-tools) |
| `auth.module.js` | Este archivo se encarga de instanciar al módulo. Ver: [Archivo *.module.js](./doc/module#archivos-modulejs) |

## Modo de uso

```js
// Para obtener una referencia hacia la configuración del módulo
const CONFIG = app.config.MODULE_NAME

// Para obtener una referencia hacia un modelo
const MODEL = app.MODULE_NAME.models.modelName

// Para obtener una referencia hacia un dao
const DAO = app.MODULE_NAME.dao.modelName

// Para obtener una referencia hacia el archivo utilitario 'util.tools.js'
const UTIL = app.MODULE_NAME.tools.util
```

**Ejemplo:**

```js
const AUTH_CONFIG   = app.config.AUTH

const USUARIO_DAO   = app.AUTH.dao.usuario
const USUARIO_MODEL = app.AUTH.models.usuario
const UTIL_TOOLS    = app.AUTH.tools.util
```

## Componentes personalizados

Un componente personalizado es aquella carpeta cuyo contenido es gestionado por si mismo a partir de un fichero base.

Puede encontrar mas información de este tipo de componentes en [Componentes personalizados](./doc/component#componentes-personalizados)
