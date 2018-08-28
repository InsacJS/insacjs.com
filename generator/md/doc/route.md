# Archivo  `*.route.js`

Este archivo se encarga de definir las propiedades de una ruta.

```js
module.exports = (app) => {
  const ROUTE = {}

  ROUTE.listar = {
    path        : '/api/v1/usuarios',
    method      : 'get',
    description : 'Devuelve una lista de usuarios.',
    version     : 1
  }

  // <!-- [CLI] - [COMPONENT] --!> //

  return ROUTE
}
```

**Nota.-** El flag `// <!-- [CLI] - [COMPONENT] --!> //` es utilizado por `insac-cli` para modificar el archivo.

## Propiedades de una ruta

| Propiedad        | Tipo         | Descripción                                                                  | Valor por defecto     |
| ---------------- | ------------ | ---------------------------------------------------------------------------- | --------------------- |
| `path`           | `String`     | Dirección (URI).                                                             |                       |
| `method`         | `String`     | Método HTTP (`get`, `post`, `put`, `patch` o `delete`).                      |                       |
| `description`    | `String`     | Descripción.                                                                 | `<name>`              |
| `version`        | `Number`     | Número de versión.                                                           | `1`                   |
| `name`           | `String`     | Nombre.                                                                      | `<path>/<method>`     |
| `group`          | `String`     | Grupo.                                                                       | `<MODULE>/<RESOURCE>` |
| `input`          | `FieldGroup` | Formato de los datos de entrada.                                             | `<INPUT>`             |
| `output`         | `FieldGroup` | Formato de los datos de salida.                                              | `<OUTPUT>`            |
| `middleware`     | `Function[]` | Middlewares.                                                                 | `<MIDDLEWARE>`        |
| `controller`     | `Function`   | Controlador.                                                                 | `<CONTROLLER>`        |
| `inputExamples`  | `Object[]`   | Ejemplos de datos de entrada. `{ title, data }`                              | `null`                |
| `outputExamples` | `Object[]`   | Ejemplos de datos de salida. `{ title, data }`                               | `null`                |
| `sampleRequest`  | `String`     | Dirección URL para probar una petición.                                      | `null`                |
| `outputFilter`   | `Boolean`    | Indica si se va a utilizar el componente `OUTPUT` para filtrar el resultado. | `true`                |
| `inputLogs`      | `Boolean`    | Indica si se van a mostrar los logs de los datos de entrada `INPUT`.         | `true`                |
| `permissions`    | `String[]`   | Nombres de los roles que tiene permitido el acceso.                          | `null`                |
| `plain`          | `Boolean`    | Indica si el resultado será un objeto plano.                                 | `false`               |
