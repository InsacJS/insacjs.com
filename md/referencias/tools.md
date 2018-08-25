# Carpeta `tools`

Archivos con extensión `.tool.js`. Contienen funciones para realizar tareas pequeñas.

**Ejemplo.-** Archivo `util.tool.js`

```js
const UTIL = {}

UTIL.myFunction = () => {
  // TODO
}

module.exports = UTIL
```

## Tools globales

```txt
blog
 ├─ src
       ├─ tools
             └─ util.tool.js
```

Modo de uso:
```js
app.tools.util.myFunction()
```

## Tools locales

```txt
blog
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ tools
                          └─ util.tool.js
```

Modo de uso:
```js
app.AUTH.tools.util.myFunction()
```
