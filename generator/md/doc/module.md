# Archivos `*.module.js`

Este archivo se utiliza para instanciar a un módulo.

```txt
app
  ├─ src
        ├─ modules
              ├─ API
                    └─ api.module.js
```

**Ejemplo:** Archivo `api.module.js`

```js
const { Module } = require('insac')

module.exports = (app) => {
  const API = new Module(app.config.API)

  // TODO

  return API
}
```
