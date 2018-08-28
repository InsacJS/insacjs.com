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

## Función `addComponent`

Esta función permite adicionar componentes personalizados.

```js
// Los archivos de estas carpetas se ejecutan después de cargar el módulo (onStart)
API.addComponent('mails', '.mail.js')
API.addComponent('reports', '.report.js')
API.addComponent('services', '.service.js')
API.addComponent('storage', '.storage.js')

// Los archivos de esta carpeta se ejecutan después de iniciar(onInit), instalar (onSetup) y cargar (onStart) el módulo
API.addComponent('custom' ,'.custom.js', { onInit: true, onSetup: true, onStart: true })
```

Para más información, revise la sección [Componentes personalizados](./doc/component#componentes-personalizados).

## Función `addAction`

Esta función permite ejecutar funciones en un evento determinado:

**Ejemplo:**

```js
API.addAction('onInit', async () => {
  // TODO
})

API.addAction('onSetup', async () => {
  // TODO
})

API.addAction('onStart', async () => {
  // TODO
})
```
