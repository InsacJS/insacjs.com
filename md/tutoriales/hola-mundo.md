# Hola mundo

Este es un pequeño ejemplo para ver el funcionamiento del framework.

## Instalación

`npm install insac --save`

## Estructura básica

Crear los siguientes archivos y ubicarlos como se muestra a continuación.

```txt
app
 ├─ api
 │     ├─ resources
 │     |   └─ welcome
 │     |         ├─ welcome.controller.js
 │     |         ├─ welcome.input.js
 │     |         ├─ welcome.middleware.js
 │     |         ├─ welcome.output.js
 │     |         └─ welcome.route.js
 │     └─ api.module.js
 ├─ index.js
 └─ package.json
```

Archivo `ìndex.js`

```js
const { Insac } = require('insac')

const service = new Insac()
service.addModule('api')
service.init()
```

Archivo `api.module.js`

```js
const { ResourceModule } = require('insac')

module.exports = (app) => {
  return new ResourceModule(app.config.API)
}
```

Archivo `welcome.route.js`

```js
module.exports = (app) => {
  const ROUTE = {}

  ROUTE.get = {
    path        : '/welcome',
    method      : 'get',
    description : 'Muestra un mensaje de bienvenida.'
  }

  return ROUTE
}
```

Archivo `welcome.input.js`

```js
const { Field } = require('insac')

module.exports = (app) => {
  const INPUT = {}

  INPUT.get = null

  return INPUT
}
```

Archivo `welcome.output.js`

```js
const { Field } = require('insac')

module.exports = (app) => {
  const OUTPUT = {}

  OUTPUT.get = {
    msg: Field.TEXT({ comment: 'Mensaje.', example: 'Hola!!!' })
  }

  return OUTPUT
}
```

Archivo `welcome.middleware.js`

```js
module.exports = (app) => {
  const MIDDLEWARE = {}

  MIDDLEWARE.get = null

  return MIDDLEWARE
}
```

Archivo `welcome.controller.js`

```js
module.exports = (app) => {
  const CONTROLLER = {}

  CONTROLLER.get = async (req, res, next) => {
    try {
      return res.success200({ msg: 'Hola mundo!!!' })
    } catch (err) { return next(err) }
  }

  return CONTROLLER
}
```

## Ejecución

`node index.js`
