# Clase `Field`

Esta clase es utilizada para definir los atributos de un modelo y los datos de entrada y salida de una ruta.

```js
const { Field, THIS } = require('insac')]
```

## Tipos de datos básicos

| Tipo       | Descripción                        | Validadores por defecto                    | Ejemplo                                              |
| ---------- | ---------------------------------- | ------------------------------------------ | ---------------------------------------------------- |
| `STRING`   | Cadena de texto.                   | `len: [0, LENGTH=255]`                     | `Field.STRING(props)`, `Field.STRING(LENGTH, props)` |
| `TEXT`     | Bloque de texto.                   | `len: [0, 2147483647]`                     | `Field.TEXT(props)`                                  |
| `INTEGER`  | Número entero.                     | `isInt: true`, `min: 0`, `max: 2147483647` | `Field.INTEGER(props)`                               |
| `FLOAT`    | Número en coma flotante.           | `isFloat: true`, `min: 0`, `max: 1E+308`   | `Field.FLOAT(props)`                                 |
| `BOOLEAN`  | Valor booleano.                    | `isBoolean: true`                          | `Field.BOOLEAN(props)`                               |
| `DATE`     | Fecha (día y hora).                | `isDate: true`                             | `Field.DATE(props)`                                  |
| `DATEONLY` | Fecha (día).                       | `isDate: true`                             | `Field.DATEONLY(props)`                              |
| `TIME`     | Tiempo (hora). Formato: `HH:mm:ss` | `isTime: custom`                           | `Field.TIME(props)`                                  |
| `JSON`     | Objeto de tipo JSON.               | `isJson: custom`                           | `Field.JSON(props)`                                  |
| `JSONB`    | Objeto de tipo JSONB.              | `isJson: custom`                           | `Field.JSONB(props)`                                 |
| `UUID`     | Código de tipo UUID.               | `isUUID: 4`                                | `Field.UUID(props)`                                  |
| `ENUM`     | Tipo enumerado.                    | `isIn: [VALUES]`                           | `Field.ENUM(VALUES, props)`                          |
| `ARRAY`    | Lista de tipos básicos.            | `isArray: custom`                          | `Field.ARRAY(Field.STRING(), props)`                 |

## Tipos de datos predefinidos

| Tipo           | Descripción                                 | Validadores por defecto                      | Ejemplo                     |
| -------------- | ------------------------------------------- | -------------------------------------------- | --------------------------- |
| `ID`           | Clave primaria autoincrementable.           | `isInt: true`, `min: 1`, `max: 2147483647`   | `Field.ID(props)`           |
| `CREATED_AT`   | Fecha de creación del registro.             | `isDate: true`                               | `Field.CREATED_AT(props)`   |
| `UPDATED_AT`   | Fecha de modificación del registro.         | `isDate: true`                               | `Field.UPDATED_AT(props)`   |
| `DELETED_AT`   | Fecha de eliminación del registro.          | `isDate: true`                               | `Field.DELETED_AT(props)`   |
| `DELETED_AT`   | Fecha de eliminación del registro.          | `isDate: true`                               | `Field.DELETED_AT(props)`   |
| `CREATED_USER` | ID del usuario que crea el registro.        | `isInt: true`, `min: 0`, `max: 2147483647`   | `Field.CREATED_USER(props)` |
| `UPDATED_USER` | ID del usuario que modifica el registro.    | `isInt: true`, `min: 0`, `max: 2147483647`   | `Field.UPDATED_USER(props)` |
| `DELETED_USER` | ID del usuario que elimina el registro.     | `isInt: true`, `min: 0`, `max: 2147483647`   | `Field.DELETED_USER(props)` |
| `STATUS`       | Estado en el que se encuentra el registro.  | `isIn: ['ACTIVO', 'INACTIVO, 'ELIMINADO]`    | `Field.STATUS(props)`       |
| `FIELDS`       | Campos a devolver en el resultado.          | `len: [0, 255]`                              | `Field.FIELDS(props)`       |
| `ORDER`        | Orden en el que se devolverá el resultado.  | `len: [0, 255]`                              | `Field.ORDER(props)`        |
| `LIMIT`        | Límite de registros por página.             | `isInt: true`, `min: 1`, `max: 2147483647`   | `Field.LIMIT(props)`        |
| `PAGE`         | Número de página de una lista de registros. | `isInt: true`, `min: 1`, `max: 2147483647`   | `Field.PAGE(props)`         |

## Propiedades de un atributo

| Propiedad       | Tipo      | Descripción                                                          |
| --------------- | --------- | -------------------------------------------------------------------- |
| `primaryKey`    | `Boolean` | Indica si es una clave primaria.                                     |
| `autoIncrement` | `Boolean` | Indica si es autoincrementable.                                      |
| `unique`        | `Boolean` | Indica si el registro debe ser único.                                |
| `defaultValue`  | `Object`  | Valor por defecto.                                                   |
| `example`       | `Object`  | Valor de ejemplo.                                                    |
| `allowNull`     | `Boolean` | Indica si acepta valores nulos.                                      |
| `allowNullObj`  | `Boolean` | Indica si el objeto al que pertenece el campo acepta valores nulos.  |
| `comment`       | `String`  | Descripción del atributo.                                            |
| `uniqueMsg`     | `String`  | Mensaje de error para validar `unique`.                              |
| `allowNullMsg`  | `String`  | Mensaje de error para validar `allowNull`.                           |
| `validate`      | `Object`  | Objeto para validar el tipo de dato.                                 |

A continuación se muestra un ejemplo para crear un campo de tipo ID:

```js
const ID = Field.INTEGER({
  primaryKey    : true,
  autoIncrement : true,
  unique        : true,
  defaultValue  : null,
  example       : 1
  allowNull     : false,
  comment       : 'Identificador único.',
  uniqueMsg     : 'El campo ID debe ser único.',
  allowNullMsg  : 'El campo ID es requerido.',
  validate      : { min: { args: 1, msg: 'Debe ser mayor o igual a 1.' } },
})
```

## Propiedad validate

Un validador puede tener uno de los siguientes formatos:

```js
const validate = { min: 10 }
const validate = { min: { args: 10 } }
const validate = { min: { args: 10, msg: 'Mensaje de error personalizado.' } }

const validate = { len: [2, 5] }
const validate = { len: { args: [2, 5] } }
const validate = { len: { args: [2, 5], msg: 'Mensaje de error personalizado.' } }

const validate = { isIn: [['A', 'B']] }
const validate = { isIn: { args: [['A', 'B']] } }
const validate = { isIn: { args: [['A', 'B']], msg: 'Mensaje de error personalizado.' } }
```

Cuando se trata de validadores booleanos, son válidos los siguientes formatos:

```js
const validate = { isEmail: true }
const validate = { isEmail: { msg: 'Mensaje de error personalizado.' } }
```

Para validadores personalizados:

```js
const validate = {
  esNumeroPar: (value) => {
    if (parseInt(value) % 2 !== 0) {
      throw new Error(`Debe ser un número par.`)
    }
  }
}
```

## Lista de validadores

A continuación se muestra una lista de opciones de la propiedad `validate` que utiliza Sequelize.

```js
const validate = {
  is             : ['^[a-z]+$', 'i'],  // Es igual
  is             : /^[a-z]+$/i,        // Es igual
  not            : ['[a-z]', 'i'],     // No es igual
  isEmail        : true,               // Es una dirección Email
  isUrl          : true,               // Es una dirección URL
  isIP           : true,               // Es un número IP
  isIPv4         : true,               // Es un numero IP versión 4
  isIPv6         : true,               // Es un numero IP versión 6
  isAlpha        : true,               // Es un texto que solo tiene letras
  isAlphanumeric : true,               // Es un texto que solo tiene letras y números
  isNumeric      : true,               // Es un texto que solo tiene números
  isInt          : true,               // Es un número entero
  isFloat        : true,               // Es un número en coma flotante
  isDecimal      : true,               // Es un número decimal
  isLowercase    : true,               // Es un texto solo con letras minúsculas
  isUppercase    : true,               // Es un texto solo con letras mayúsculas
  isNull         : true,               // Es un valor nulo
  notEmpty       : true,               // No es un texto vacío
  equals         : 'ABC123',           // Es igual a
  contains       : 'def',              // Contiene a
  notContains    : 'def',              // No contiene a
  notIn          : [['A', 'B']],       // No se encuentra entre los valores
  isIn           : [['A', 'B']],       // Se encuentra entre los valores
  len            : [2, 5],             // Longitud mínima y máxima del texto
  isUUID         : 4,                  // Es un código UUID
  isDate         : true,               // Es una fecha
  isAfter        : '2010-05-30',       // Es una fecha después de
  isBefore       : '2020-05-30',       // Es una fecha antes de
  min            : 10,                 // Es un número con un valor mínimo de
  max            : 12,                 // Es un número con un valor máximo de
  isCreditCard   : true,               // Es el código de una tarjeta de crédito
}
```

## Función `use`

Adiciona un campo personalizado a la clase `Field`, posteriormente puede ser utilizado como un campo básico.

```js
Field.use('ID', Field.INTEGER({
  primaryKey    : true,
  autoIncrement : true,
  allowNull     : false,
  validate      : { min: 1 }
}))

const AUTOR = sequelize.define('autor', {
  id_autor : Field.ID(),
  nombre   : Field.STRING()
})
```

## Función `clone`

Crea una copia a partir de otro atributo, es posible modificar algunas de sus propiedades.

```js
const ID = Field.ID()

const INPUT = {
  id: Field.clone(ID, { allowNull: true })
}
```

## Función `group`

Crea un objeto de tipo **FieldGroup**. Un fieldGroup es un objeto formado por los atributos de un modelo.

Por ejemplo, si se tienen los modelos `autor` y `libro` con una relación de `1:N`.

```js
const AUTOR = sequelize.define('autor', {
  id_autor : Field.ID(),
  nombre   : Field.STRING()
})
const LIBRO = sequelize.define('libro', {
  id_libro : Field.ID(),
  titulo   : Field.STRING(10),
  precio   : Field.FLOAT()
})
LIBRO.belongsTo(AUTOR, { as: 'autor' })
AUTOR.hasMany(LIBRO, { as: 'libros' })
```

Se pueden crear los siguientes **FieldGroups**.

```js
const AUTOR_OUTPUT = Field.group(AUTOR, {
  id_autor : THIS(),
  nombre   : THIS(),
  libros   : [{ // Lista de libros
    id_libro : THIS(),
    titulo   : THIS(),
    precio   : THIS()
  }]
})

const LIBRO_OUTPUT = Field.group(LIBRO, {
  id_libro : THIS(),
  titulo   : THIS(),
  precio   : THIS(),
  autor    : { // Un autor
    id_autor : THIS(),
    titulo   : THIS(),
    precio   : THIS()
  }
})
```

La función `THIS`, indica que el campo, es parte del modelo especificado en el `group`.

## Ejemplo 1. Creando un modelo

Definiendo modelos de esta forma:

``` js
const LIBRO = sequelize.define('libro', {
  id_libro : Field.ID(),
  titulo   : Field.STRING(10),
  precio   : Field.FLOAT()
})
```

Sería lo mismo que hacer:

``` js
const LIBRO = sequelize.define('libro', {
  id: {
    type          : Sequelize.INTEGER(),
    primaryKey    : true,
    autoIncrement : true,
    allowNull     : false,
    validate      : {
      isInt : true,
      min   : 1,
      max   : 2147483647
    }
  },
  titulo: {
    type: Sequelize.STRING(10),
    validate: {
      len: [0, 10]
    }
  },
  precio: {
    type: Sequelize.FLOAT(),
    validate: {
      isFloat : true,
      min     : 0,
      max     : 1E+308
    }
  }
})
```

## Ejemplo 2. Definiendo FieldGroups anidados

``` js
const fieldGroup = Field.group(LIBRO, {
  id_libro : THIS(),
  titulo   : THIS({ allowNull: false }),
  precio   : THIS({ allowNull: false }),
  autor    : Field.group(AUTOR, {
    id_autor : THIS(),
    nombre   : THIS()
  }),
  other: Field.STRING({ comment: 'other field.' })
})
```
