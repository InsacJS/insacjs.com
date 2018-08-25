# Carpeta `hooks`

Contiene archivos con extensión `.before.hook.js` y `.after.hook.js` (no devuelven ningún valor).

**Ejemplo.-** Archivo `*.hook.js`

```js
module.exports = async (app) => {
  // TODO
}
```

## Hooks globales

Estos archivos se ejecutan antes y después de instalar y/o cargar la aplicación.

```txt
blog
 ├─ src
       ├─ hooks
             ├─ app.after.hook.js
             └─ app.before.hook.js
```

## Hooks locales

Estos archivos se ejecutan antes y después de instalar y/o cargar el módulo.

```txt
blog
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ hooks
                          ├─ auth.after.hook.js
                          └─ auth.before.hook.js
```
