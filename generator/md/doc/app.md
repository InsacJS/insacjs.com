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

service.addModule('AUTH')
service.addModule('API')
// <!-- [CLI] - [MODULE] --!> //

service.init().catch(e => {
  console.log(e)
  process.exit(1)
})

module.exports = service

```

**Nota.-** El flag `// <!-- [CLI] - [MODULE] --!> //` es utilizado por `insac-cli` para modificar el archivo.
