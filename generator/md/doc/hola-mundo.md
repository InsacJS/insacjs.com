
# Hola mundo

Para comenzar, ejecuta los siguientes comandos:

```bash
# Crea la carpeta del proyecto
$ mkdir app
$ cd app

# Inicializa el gestor de paquetes de Node.
$ npm init

# Instala el framework
$ npm install --save insac
```

Posteriormente, deberá crear algunos archivos con la siguiente estructura:

```txt
app
  ├─ src
  │     └─ modules
  │           └─ API
  │                 ├─ resources
  │                 │     └─ welcome
  │                 │           ├─ welcome.controller.js
  │                 │           ├─ welcome.input.js
  │                 │           ├─ welcome.output.js
  │                 │           └─ welcome.route.js
  │                 └─ api.module.js
  ├─ node_modules
  ├─ index.js
  └─ package.json
```

Y el siguiente contenido:

### `api.module.js`
```js
const { Module } = require('insac')

module.exports = (app) => {
  return new Module(app.config.API)
}
```

### `welcome.route.js`
```js
module.exports = (app) => {
  const ROUTE = {}

  ROUTE.hello = {
    path   : '/welcome/hello/:name',
    method : 'get'
  }

  return ROUTE
}
```

### `welcome.input.js`
```js
const { Field } = require('insac')

module.exports = (app) => {
  const INPUT = {}

  INPUT.hello = {
    params: {
      name: Field.STRING({ allowNull: false })
    },
    query: {
      number: Field.INTEGER({ allowNull: false })
    }
  }

  return INPUT
}
```

### `welcome.output.js`
```js
const { Field } = require('insac')

module.exports = (app) => {
  const OUTPUT = {}

  OUTPUT.hello = {
    message : Field.STRING(),
    number  : Field.INTEGER()
  }

  return OUTPUT
}
```

### `welcome.controller.js`
```js
module.exports = (app) => {
  const CONTROLLER = {}

  CONTROLLER.hello = async (req, res, next) => {
    try {
      const NAME   = req.params.name
      const NUMBER = req.query.number
      const RESULT = { message: `Hola ${NAME}!!!`, number: NUMBER }
      res.success200(RESULT, 'Mensaje enviado exitosamente.')
    } catch (err) { return next(err) }
  }

  return CONTROLLER
}
```

### `index.js`
```js
const { Insac } = require('insac')

const service = new Insac()

service.addModule('api')

service.init().catch(e => {
  console.log(e)
  process.exit(1)
})

module.exports = service
```

Ahora ya se puede ejecutar la aplicación:

```bash
$ node index.js

=====================================   
  ---------------------------------     
    I N S A C   F R A M E W O R K       
  =================================     
-------------------------------------   

            Versión 3.0.0               


Sistema : App
Versión : 1.0.0
Entorno : development


[archivo] /src/modules/API/api.module.js ✓


CONFIGURACIÓN INICIAL
=====================

[archivo] app.before.hook.js (default) ✓


CARGANDO APLICACIÓN
===================


Módulo API ...

[archivo] /src/modules/API/resources/welcome/welcome.route.js ✓
[archivo] /src/modules/API/resources/welcome/welcome.input.js ✓
[archivo] /src/modules/API/resources/welcome/welcome.output.js ✓
[archivo] /src/modules/API/resources/welcome/welcome.middleware.js ✓
[archivo] /src/modules/API/resources/welcome/welcome.controller.js ✓

[ruta] GET    /welcome/hello/:name ... hello ✓


CONFIGURACIÓN FINAL
===================

[archivo] app.after.hook.js (default) ✓

[apidoc] Módulo API ... ✓


La aplicación ha sido cargada con éxito.  


EJECUTANDO APLICACIÓN
=====================

[SERVICIO] http://localhost:4000 ✓
[APIDOC]   http://localhost:4000/apidoc/API ✓
```

### `http://localhost:4000`

![Captura 1](./assets/img/hola-mundo/app/captura01.jpg)

### `http://localhost:4000/apidoc/API`

![Captura 2](./assets/img/hola-mundo/app/captura02.jpg)

### Petición de ejemplo

![Captura 3](./assets/img/hola-mundo/app/captura03.jpg)

### Mensajes de logs

![Captura 4](./assets/img/hola-mundo/app/captura04.jpg)
