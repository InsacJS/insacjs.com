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

## Tools a nivel de aplicación

```txt
app
  ├─ src
        ├─ tools
              └─ util.tool.js
```

Modo de uso:
```js
app.tools.util.myFunction()
```

## Tools a nivel de los módulos

```txt
app
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
