# Carpeta `hooks`

Contiene archivos con extensión `.before.hook.js` y `.after.hook.js` (no devuelven ningún valor).

**Ejemplo.-** Archivo `*.hook.js`

```js
module.exports = async (app) => {
  // TODO
}
```

## Hooks a nivel de aplicación

Estos archivos se ejecutan antes (before) y después (after) de instalar y/o cargar la aplicación.

```txt
app
  ├─ src
        ├─ hooks
              ├─ app.after.hook.js
              └─ app.before.hook.js
```

## Hooks a nivel de los módulos

Estos archivos se ejecutan antes (before) y después (after) de instalar y/o cargar el módulo.

```txt
app
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ hooks
                          ├─ auth.after.hook.js
                          └─ auth.before.hook.js
```
