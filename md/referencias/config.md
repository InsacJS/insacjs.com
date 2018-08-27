# Carpeta `config`

Contiene archivos con extensión `.config.js`. Algunos valores pueden ser modificados utilizando [Variables de entorno](./referencias/env), dando prioridad a estas últimas.

## Configuración global

```txt
app
  ├─ src
        ├─ config
              ├─ database.config.js
              ├─ server.config.js
              ├─ logger.config.js
              ├─ response.config.js
              └─ apidoc.config.js
```

1. [DATABASE](#title-4)
2. [SERVER](#title-5)
3. [LOGGER](#title-6)
4. [RESPONSE](#title-7)
5. [APIDOC](#title-8)

## Configuración local

```txt
app
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ config
                          ├─ auth.config.js
                          └─ auth.config.js.example
```

**Ejemplo.-** archivo `auth.config.js`

```js
const AUTH = {
  secretKey: 'ClaveSecreta',
  mail: {
    apiKey: `SG.WOZmqfcJQAyXO1AeH1Gn9Q.umMZsv5hJje5R0_3RMSs8Z`
  }
}

module.exports = AUTH
```

**Ejemplo.-** archivo `auth.config.js.example`

```txt
const AUTH = {
  secretKey: '<SECRET_KEY_VALUE>',
  mail: {
    apiKey: 'SG.WOZmqfcJ...'
  }
}

module.exports = AUTH
```

Modo de uso:

```js
const secretKey = app.config.AUTH.secretKey
const apiKey    = app.config.AUTH.mail.apiKey
```

### DATABASE

Configuración por defecto `database.config.js`

```js
const DATABASE = {
  setup  : false,
  sqlLog : false,

  username : 'postgres',
  password : 'postgres',
  database : '_example',

  // http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
  params: {
    dialect          : 'postgres', // postgres, mysql, mssql, sqlite
    host             : '127.0.0.1',
    port             : 5432, // postgres: 5432, mysql: 3306, mssql: 1433
    timezone         : '+00:00',
    lang             : 'es',
    logging          : false,
    operatorsAliases : false,

    define: {
      underscored     : true,
      freezeTableName : true,
      timestamps      : true,
      paranoid        : true,
      createdAt       : '_fecha_creacion',
      updatedAt       : '_fecha_modificacion',
      deletedAt       : '_fecha_eliminacion'
    }
  },

  // Para controlar la instalación de la base de datos
  onSetup: {
    modules: [],

    dropDatabase   : false,
    createDatabase : true,

    dropSchemas   : false,
    createSchemas : true,

    dropTables   : true,
    createTables : true,

    createSeeders: true
  }
}

module.exports = DATABASE
```
### SERVER

Configuración por defecto `server.config.js`

```js
const SERVER = {
  start  : true, // Habilita la carga de los componentes del servidor
  listen : true, // Habilita el listen del servidor cuando se ejecuta la aplicación

  protocol : 'http',
  hostname : 'localhost',
  port     : 4000,
  env      : 'development',

  // https://github.com/expressjs/cors#configuration-options
  cors        : true,
  corsOptions : {
    'origin'                       : '*',
    'methods'                      : 'GET,POST,PUT,DELETE,OPTIONS',
    'preflightContinue'            : true,
    'Access-Control-Allow-Headers' : 'Authorization,Content-Type,Content-Length'
  },

  // https://helmetjs.github.io/docs/
  helmet        : true,
  helmetOptions : {},

  // https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener
  https        : false,
  httpsOptions : {}
}

module.exports = SERVER
```

### LOGGER

Configuración por defecto `logger.config.js`

```js
const LOGGER = {
  enabled : true, // Habilita los logs
  colors  : true, // Hablita los colores de los logs

  console: {
    timestamp : true, // Muestra el timestamp
    reqId     : true, // Muestra el id de la petición
    transport : {
      level : 'info', // Nivel de detalle
      json  : false
    }
  },

  file: {
    // fatal: 0, error: 1, warn: 2, notice: 3, info: 4, verbose: 5, debug: 6, silly: 7
    levels    : ['error', 'warn', 'info'],
    transport : {
      json     : true,
      maxsize  : 5242880,
      maxFiles : 5
    }
  },

  // Habilita el registro de los datos de entrada y salida
  include: {
    request: {
      path: true
    },

    response: {
      success  : true,
      error    : true,
      error500 : true
    },

    input: {
      headers : false,
      params  : true,
      query   : true,
      body    : true
    },

    output: {
      data: false
    }
  }
}

module.exports = LOGGER
```

### RESPONSE

Configuración por defecto `response.config.js`

```js
const RESPONSE = {
  all200: false, // Indica si en las respuestas se incluirá el código 200 OK para todas las peticiones

  successFormat: (result) => {
    const RESULT = {
      status  : result.status,
      code    : result.code,
      message : result.message
    }
    if (result.metadata) { RESULT.metadata = result.metadata }
    if (result.data)     { RESULT.data     = result.data }
    return RESULT
  },

  errorFormat: (result) => {
    result.errors.forEach(err => {
      if (process.env.NODE_ENV === 'production' || !err.dev) delete err.dev
    })
    return {
      status  : result.status,
      code    : result.code,
      message : result.message,
      errors  : result.errors
    }
  }
}

module.exports = RESPONSE
```

### APIDOC

Configuración por defecto `apidoc.config.js`

```js
const PROTOCOL = process.env.PROTOCOL
const HOSTNAME = process.env.HOSTNAME
const PORT     = process.env.PORT

const APIDOC = {
  enabled: true, // Habilita la creación del apidoc

  title     : 'Apidoc',
  name      : 'Documentación',
  version   : '1.0.0',
  url       : `${PROTOCOL}://${HOSTNAME}:${PORT}`,
  sampleUrl : `${PROTOCOL}://${HOSTNAME}:${PORT}`,

  template: {
    withGenerator : false,
    withCompare   : true,
    forceLanguage : 'es'
  },

  header: null,

  footer: {
    title    : 'INSTRUCCIONES',
    filename : 'FOOTER.md'
  }
}

module.exports = APIDOC
```

Puede personalizar el fichero [FOOTER.md](./assets/md/FOOTER.md) adicionando el mismo a la raíz del proyecto.

```txt
app
  ├─ src
  ├─ index.js
  ├─ FOOTER.md
  └─ package.json
```
