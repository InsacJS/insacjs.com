# Archivo  `app.js`

Este archivo se encarga de instanciar la aplicación y establecer el orden de ejecución de los módulos.

```txt
app
  ├─ src
        └─ app.js
```

**Ejemplo:**

```js
const { Insac } = require('insac')

const service = new Insac()

// <!-- [CLI] - [MODULE] --!> //

service.init().catch(e => {
  console.log(e)
  process.exit(1)
})

module.exports = service
```

**Nota.-** El flag `// <!-- [CLI] - [MODULE] --!> //` es utilizado por `insac-cli` para modificar el archivo.

## Función `addModule`

Adiciona un módulo a la aplicación.

**Ejemplo:**

```js
service.addModule('AUTH')
service.addModule('API')
```

## Función `addAction`

Esta función permite ejecutar funciones en un evento determinado.

**Ejemplo:**

```js
service.addAction('onInit', async () => {
  // TODO
})

service.addAction('onSetup', async () => {
  // TODO
})

service.addAction('onStart', async () => {
  // TODO
})
```

## Función `init`

Configura, instala, carga y ejecuta la aplicación, dependiendo del modo de ejecución.

**Ejemplo:**

```js
service.init().catch(e => {
  console.log(e)
  process.exit(1)
})
```
