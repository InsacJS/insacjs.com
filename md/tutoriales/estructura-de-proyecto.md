# Estructura del proyecto

El framework automatiza varios procesos utilizando los nombres y la extensión de los ficheros, de esta forma, es posible tratar el contenido de cada fichero de una u otra forma sin tener que estar importándolo a cada momento, es por eso que se hace énfasis en la asignación de extensiones a cada fichero del proyecto.

A continuación se describen todas las carpetas y archivos que se encuentran dentro de un proyecto que ha sido creado con la herramienta de línea de comandos `insac-cli`.

La siguiente estructura, se obtiene luego de ejecutar el comando `insac new blog`.

```txt
blog
 ├─ certs
 │     ├─ example.privateKey.pem
 │     ├─ example.publicKey.pem
 │     ├─ example.server.csr
 │     ├─ privateKey.pem
 │     ├─ publicKey.pem
 │     └─ README.md
 ├─ node_modules
 ├─ public
 │     └─ apidoc
 ├─ logs
 ├─ src
 │     ├─ config
 │     │     ├─ app.config.js
 │     │     └─ example.app.config.js
 │     ├─ hooks
 │     │     ├─ custom.after.hook.js
 │     │     └─ custom.before.hook.js
 │     ├─ modules
 │     └─ app.js
 ├─ test
 │     ├─ integration
 │     │     └─ Example.spec.js
 │     ├─ unit
 │     │     └─ Example.spec.js
 │     ├─ helpers.js
 │     └─ mocha.opts
 ├─ .eslintrc.js
 ├─ .gitignore
 ├─ .insac.js
 ├─ ecosystem.json
 ├─ example.ecosystem.json
 ├─ index.js
 ├─ package.json
 └─ README.md
 └─ yarn.lock
```

### Carpeta `certs`

Esta carpeta contiene las claves pública y privada que pueden utilizarse para crear los tokens de acceso en un módulo de autenticación, también puede utilizarse para que el servidor se ejecute bajo el protocolo `HTTPS`, haciendo mas segura la transferencia de datos con el cliente.

Esta carpera contiene los siguientes ficheros:

- `privateKey.pem` Clave privada
- `publicKey.pem` Clave pública
- `server.csr` Solicitud de firma de certificado SSL

Cuando se trabaja con `GIT`, al momento de subir los cambios al repositorio, por seguridad nunca se subirán los ficheros anteriormente descritos, solamente se subirán los archivos cuyo nombre comiencen con `example`.

Adicionalmente se incluye un fichero `README.md` que indica cómo se pueden generar los archivos mencionados.

### Carpteta `node_modules`

Es la carpeta que utiliza el gestor de paquetes de node y contiene todos los paquetes y librerías que requiere el framework.

### Carpeta `public`

Es la carpeta publica de la aplicación, almacena ficheros estáticos que pueden ser accedidos desde el navegador.

### Carpeta `public/apidoc`

Esta carpeta se crea automáticamente y contiene la documentación del servicio `APIDOC`.

### Carpeta `logs`

Aquí es donde se almacenan todos los logs del sistema.

### Carpeta `src`

Esta carpeta contiene todo el código fuente de la aplicación, y es donde se trabajará continuamente durante el desarrollo.

### Archivo `src/app.js`

Contiene el fichero que se encarga de cargar la aplicación y adicionar los módulos necesarios.

```js
const { Insac } = require('insac')

const service = new Insac()

service.addModule('api')
// <!-- [CLI] - [MODULE] --!> //

service.init()

module.exports = service
```

### Carpeta `src/config`

Se utiliza para almacenar los archivos de configuración del proyecto.

Para instalar la aplicación en cualquier equipo, deberá bastar con cambiar los valores de configuración que se encuentran dentro de estos ficheros, por lo tanto, estos ficheros únicamente deben contener información que se necesite al momento de instalar la aplicación.

Por ejemplo, las credenciales de acceso a la base de datos será diferente en cada equipo donde se instale la aplicación, por lo que habrá que configurarlo desde estos ficheros.

Por otro lado, la Información acerca de los roles de los usuarios, siempre será la misma sin importar el equipo donde se instale la aplicación, por lo tanto no será necesario incluirlo en estos ficheros.

### Archivo `src/config/app.config.js`

Contiene las configuraciones para el servidor `SERVER`, la base de datos `DATABASE` y los módulos del proyecto si es que fueran necesarios.

```js
const fs   = require('fs')
const path = require('path')

// |=============================================================|
// |------------ CONFIGURACIÓN PARA LA BASE DE DATOS ------------|
// |=============================================================|

exports.DATABASE = {
  username : process.env.DB_USER || 'postgres',
  password : process.env.DB_PASS || 'postgres',
  database : process.env.DB_NAME || '_example',
  params   : {
    dialect : 'postgres',
    host    : process.env.DB_HOST_NAME || '127.0.0.1',
    port    : process.env.DB_HOST_PORT || '5432'
  }
}

// |=============================================================|
// |------------ CONFIGURACIÓN PARA EL SERVIDOR -----------------|
// |=============================================================|

exports.SERVER = {
  port : process.env.PORT     || 4000,
  env  : process.env.NODE_ENV || 'development',
  cors : {
    'origin'                       : '*',
    'methods'                      : 'GET,POST,PUT,DELETE,OPTIONS',
    'preflightContinue'            : true,
    'Access-Control-Allow-Headers' : 'Authorization,Content-Type,Content-Length'
  },
  options: {
    key  : fs.readFileSync(path.resolve(process.cwd(), 'certs/privateKey.pem')),
    cert : fs.readFileSync(path.resolve(process.cwd(), 'certs/publicKey.pem'))
  },
  https: false
}

// |=============================================================|
// |------------ CONFIGURACIÓN PARA LOS MÓDULOS -----------------|
// |=============================================================|

// <!-- [CLI] - [CONFIG] --!> //
```

Al igual que la carpeta `certs`, cuando se trabaja con `GIT`, estos archivos no se guardan en el repositorio, en su lugar se subiran los archivos que contengan la palabra `example`.

### Carpeta `src/hooks`

Contiene los ficheros que realizan operaciones antes y después de instalar o inicializar los módulos del sistema.

### Carpeta `src/hooks/custom.after.hook.js`

Contiene las tareas que se realizan **después** de cargar los módulos, puede utilizarse para controlar errores.

```js
module.exports = (app) => {
  // |======================================================================|
  // |----------- TAREAS A REALIZAR DESPUÉS DE CARGAR LOS MÓDULOS ----------|
  // |======================================================================|

  // Ejemplo.- Envía un mensaje por correo electrónico al equipo de soporte.
  //
  // app.use((err, req, res, next) => {
  //   if (err && (err.code === 500)) {
  //     app.MAIL.send.error500(req, err)
  //   }
  //   return next(err)
  // })
}
```

### Carpeta `src/hooks/custom.before.hook.js`

Contiene las tareas que se realizan **antes** de cargar los módulos. Puede utilizarse para cargar middlewares globales.

```js
module.exports = (app) => {
  // |======================================================================|
  // |----------- TAREAS A REALIZAR ANTES DE CARGAR LOS MÓDULOS ------------|
  // |======================================================================|

  // Ejemplo.- Muestra información de una petición.
  //
  // app.use((req, res, next) => {
  //   console.log(req.id, req.method, req.originalUrl)
  //   return next()
  // })
}
```

### Carpeta `src/modules`

El proyecto se organiza mediante módulos, cada módulo se encarga de una tarea específica dentro de la aplicación.

A continuación se describen los diferentes tipos de módulos que existen:

### - Módulo de tipo `MODULE`

Es el módulo base del que heredan el resto de los módulos. Especializado en crear funciones que pueden ser utilizadas en otros módulos.

La clase `Module` contiene las funciones `onSetup` y `onStart` los cuales se ejecutan con los siguientes comandos `npm run setup` y `npm run start`.

Por ejemplo, existen tareas que se requieren en casi todos los módulos, para esto podemos crear el módulo `UTIL` cuya estructura sería la siguiente:

```txt
├─ src
      ├─ modules
            └─ UTIL
                  ├─ services
                  │     └─ util.service.js
                  └─ util.module.js
```

### Archivo `src/modules/UTIL/util.module.js`

```js
const { Module } = require('insac')

module.exports = (app) => {
  const CONFIG = app.config.UTIL

  return new Module(CONFIG)
}
```

### Carpeta `src/modules/UTIL/services`

Contiene todas las tareas que puede realizar el módulo y pueden ser ejecutadas desde otros módulos.

### Archivo `src/modules/UTIL/services/util.service.js`

```js
module.exports = (app) => {
  const UTIL = {}

  UTIL.log = (obj) => {
    console.log(require('util').inspect(obj, { depth: null }))
  }

  return UTIL
}
```

### - Módulo de tipo `RESOURCE`

Es el módulo principal de la aplicación. Especializado en crear recursos.

Cuando se instala un módulo de este tipo, se crea un **nuevo esquema de base de datos** dedicado para aquellas tablas que se creen dentro del módulo, esto lo gestiona Sequelize, por lo que no habrá que preocuparse por las consultas, las cuales se realizan de la misma forma en la que se harían sin esquemas.

Por ejemplo, para un módulo `API` que contiene el recurso `libro`, la estructura sería la siguiente:

```txt
├─ src
      ├─ modules
            └─ API
                  ├─ dao
                  │     └─ libro.dao.js
                  ├─ models
                  │     └─ libro.model.js
                  ├─ resources
                  │     └─ api
                  │           └─ v1
                  │                 └─ libros
                  │                       ├─ libro.controller.js
                  │                       ├─ libro.input.js
                  │                       ├─ libro.middleware.js
                  │                       ├─ libro.output.js
                  │                       └─ libro.route.js
                  ├─ seeders
                  │     ├─ prod
                  │     │     └─ libro.seed.js
                  │     └─ libro.seed.js
                  └─ api.module.js
```

### Archivo `src/modules/API/api.module.js`

Se encarga de configurar e instanciar al módulo.

```js
const { ResourceModule } = require('insac')

module.exports = (app) => {
  const CONFIG = app.config.API

  return new ResourceModule(CONFIG)
}
```

### Carpeta `src/modules/API/dao`

Contiene todos los DAO asociados a los modelos. Un DAO (Data Access Object) maneja la conexión con la base de datos para obtener y guardar los datos.

Cualquier consulta u operación con la base de datos, debe realizarse a través de estos ficheros y NO directamente desde los modelos.

Un DAO siempre realiza operaciones atómicas contra la base de datos, las transacciones deben declararse en los controladores.

### Archivo `src/modules/API/dao/libro.dao.js`

```js
const { Dao } = require('insac')

module.exports = (app) => {
  const MODEL = app.API.models.libro
  const DAO   = new Dao(MODEL)

  // DAO.findOne         = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.findAll         = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.count           = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.findAndCountAll = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.create          = (t, data)                                      => {}   : Promise
  // DAO.update          = (t, data, where, not, paranoid = true)         => {}   : Promise
  // DAO.destroy         = (t, data, where, not, paranoid = true)         => {}   : Promise
  // DAO.restore         = (t, data, where, not)                          => {}   : Promise

  return DAO
}
```

### Carpeta `src/modules/API/models`

Contiene los modelos que representan a las tabla de la base de datos. Un modelo siempre estará asociado a un esquema de base de datos.

El framework utiliza `Sequelize` para crear los modelos y realizar consultas a la base de datos.

### Archivo `src/modules/API/models/libro.model.js`

```js
const { Field } = require('insac')

module.exports = (sequelize, Sequelize) => {
  const MODEL = sequelize.define('libro', {
    id_libro: Field.ID({
      comment: 'ID libro.'
    }),
    titulo: Field.STRING({
      comment : 'Título del libro.',
      example : 'El gato negro'
    }),
    nro_paginas: Field.INTEGER({
      comment : 'Número de páginas.',
      example : '123'
    }),
    precio: Field.FLOAT({
      comment: 'Precio del libro.'
    }),
    _estado               : Field.STATUS,
    _usuario_creacion     : Field.CREATED_USER,
    _usuario_modificacion : Field.UPDATED_USER,
    _usuario_eliminacion  : Field.DELETED_USER,
    _fecha_creacion       : Field.CREATED_AT,
    _fecha_modificacion   : Field.UPDATED_AT,
    _fecha_eliminacion    : Field.DELETED_AT
  }, {
    schema: 'api'
  })

  MODEL.associate = (app) => {
    // TODO
  }

  return MODEL
}
```

### Carpeta `src/modules/API/resources`

Aqui se definen los recursos que ofrece el módulo. Un recurso esta conformado por varias rutas. Por ejemplo, para gestionar los `libros` de una biblioteca, el recurso contaría con las siguientes rutas:

```txt
[GET]    /api/v1/libros ..................... get
[GET]    /api/v1/libros/:id_libro ........... getId
[POST]   /api/v1/libros ..................... create
[PUT]    /api/v1/libros/:id_libro ........... update
[DELETE] /api/v1/libros/:id_libro ........... destroy
[PUT]    /api/v1/libros/:id_libro/restore ... restore
```

### Flujo de una petición

Una ruta `ROUTE` recibe los datos de entrada `INPUT`, verifica que la información proporcionada sea válida y suficiente para continuar con el proceso `MIDDLEWARE`, realiza las tareas correspondientes `CONTROLLER` y finalmente devuelve el resultado `OUTPUT`.

```txt
┌───────────┐     ┌───────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│   ROUTE   │ --> │   INPUT   │ --> │ MIDDLEWARE │ --> │ CONTROLLER │ --> │   OUTPUT   │
└───────────┘     └───────────┘     └────────────┘     └────────────┘     └────────────┘
```

Todo este flujo se describe en varios ficheros cuya extensión define el estado en el que se encuentra. Por ejemplo, para el recurso `libros` se tendrían los siguientes ficheros:

```txt
libros
   ├─ libro.controller.js
   ├─ libro.input.js
   ├─ libro.middleware.js
   ├─ libro.output.js
   └─ libro.route.js
```

Cada fichero contiene un objeto cuyas propiedades son las claves `KEY` asociadas a una ruta.

### Archivo `src/modules/API/resources/api/v1/libros/libro.route.js`

```js
module.exports = (app) => {
  const ROUTE = {}

  ROUTE.get = {
    path        : '/api/v1/libros',
    method      : 'get',
    description : 'Devuelve una lista de registros.'
  }

  ROUTE.getId = {
    path        : '/api/v1/libros/:id_libro',
    method      : 'get',
    description : 'Devuelve un registro por ID.'
  }

  ROUTE.create = {
    path        : '/api/v1/libros',
    method      : 'post',
    description : 'Crea un nuevo registro.'
  }

  ROUTE.update = {
    path        : '/api/v1/libros/:id_libro',
    method      : 'put',
    description : 'Modifica un registro por ID.'
  }

  ROUTE.destroy = {
    path        : '/api/v1/libros/:id_libro',
    method      : 'delete',
    description : 'Elimina un registro por ID.'
  }

  ROUTE.restore = {
    path        : '/api/v1/libros/:id_libro/restore',
    method      : 'put',
    description : 'Restaura un usuario eliminado por ID.'
  }

  // <!-- [CLI] - [COMPONENT] --!> //

  return ROUTE
}
```

### Carpeta `src/modules/API/seeders`

Contiene ficheros que describen los registros que se insertarán en la base de datos cuando se instale la aplicación.

Los ficheros que se encuentren en esta carpeta, serán instalados únicamente en entornos de desarrollo `development`.

### Archivo `src/modules/API/seeders/libro.seed.js`

```js
module.exports = (app) => {
  const DATA = [
    {
      id_libro    : 1,
      titulo      : 'El gato negro',
      nro_paginas : '123',
      precio      : 12.99
    }
  ]

  DATA.forEach(data => {
    data._usuario_creacion = 1
  })

  return DATA
}
```

### Carpeta `src/modules/API/seeders/prod`

Los ficheros que se encuentren en esta carpeta, serán instalados únicamente en entornos de producción `production`.

### - Módulo de tipo `SENDGRID_MAIL`

Este módulo, se utiliza para enviar mensajes por correo electrónico con el servidor SMTP que ofrece SendGrid. Se requiere una cuenta registrada en [https://sendgrid.com](https://sendgrid.com) para obtener el `APIKEY` que se utiliza para enviar los mensajes.

La estructura del módulo, es la siguiente:

```txt
├─ src
      ├─ modules
            └─ EMAIL
                  ├─ emails
                  │     └─ welcome
                  |           ├─ welcome.html
                  │           └─ welcome.mail.js
                  └─ email.module.js
```

### Archivo `src/modules/EMAIL/email.module.js`

```js
const { SendGridMailModule } = require('insac')

module.exports = (app) => {
  const CONFIG = app.config.EMAIL

  return new SendGridMailModule(CONFIG)
}
```

También se requiere la siguiente configuración en el archivo `app.config.js`.

```js
exports.EMAIL = {
  sendGridApiKey : '<SENDGRID_APIKEY>',
  systemName     : 'Nombre del sistema',
  systemEmail    : 'system@example.com'
}
```

### Carpeta `test`

Contiene todas las pruebas necesarias que garantizan el correcto funcionamiento del sistema.

### Carpeta `test/integration`

Contiene todas las pruebas de integración que se requieran.

### Carpeta `test/unit`

Contiene todas las pruebas unitarias que se requieran.

### Archivo `test/helpers.js`

Contiene los datos de configuración del servidor y de la base de datos para realizar las pruebas

### Archivo `test/mocha.opts`

Contiene los parametros de configuración de `mocha`.

### Archivo `.eslintrc.js`

Contiene las reglas de validación de código.

### Archivo `.gitignore`

Contiene todos los archivos que serán ignorados por git al momento de subir los cambios al repositorio.

### Archivo `.insac.js`

Contiene información que utiliza el framework para organizar el proyecto.

```js
const path = require('path')

exports.PATH = {
  modules : path.resolve(__dirname, 'src/modules'),
  config  : path.resolve(__dirname, 'src/config'),
  hooks   : path.resolve(__dirname, 'src/hooks'),
  logs    : path.resolve(__dirname, 'logs')
}

exports.APIDOC = {
  title    : 'Apidoc',
  name     : 'Documentación'
}

exports.LOGGER = {
  console: {
    timestamp : true,
    reqId     : true
  },
  file: {
    maxsize  : 5242880,
    maxFiles : 5,
    levels   : ['error', 'warn'] // error, warn, info, trace, notice
  }
}
```

### Archivo `ecosystem.json`

Este archivo es el que utiliza `PM2` para ejecutar aplicaciónes en producción.

Contiene los parametros de configuración de la aplicación.

Al igual que los archivos de configuración mencionados al inicio, por seguridad este archivos nunca se guardará en el repositorio, en su lugar se subirá el archivo `example.ecosystem.json`.

### Archivo `index.js`

Es el punto de entrada a la aplicación.

### Archivo `package.json`

Archivo utilizado por el gestor de paquetes de node `NPM`. Contiene información básica de la aplicación y todas las dependencias que esta requiere. También incluye todos los comandos de instalación y ejecución de la aplicación.

```json
{
  "name": "app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "start-sql": "SQL_LOG=true node index.js",
    "start-prod": "NODE_ENV=production APIDOC=false node index.js",
    "setup": "SETUP=true START=false node index.js",
    "setup-prod": "NODE_ENV=production SETUP=true START=false node index.js",
    "lint": "\"node_modules/.bin/eslint\" index.js src/",
    "test": "npm run test-unit && npm run test-integration",
    "test-unit": "NODE_ENV=test \"node_modules/.bin/mocha\" --recursive \"./test/unit/{,/**/}*.spec.js\"",
    "test-integration": "NODE_ENV=test \"node_modules/.bin/mocha\" --recursive \"./test/integration/{,/**/}*.spec.js\""
  },
  "dependencies": {
    "insac": "^2.1.10"
  },
  "devDependencies": {
    "chai": "^4.1.2",
    "eslint": "^4.19.1",
    "eslint-config-standard": "^11.0.0",
    "eslint-plugin-import": "^2.12.0",
    "eslint-plugin-node": "^6.0.1",
    "eslint-plugin-promise": "^3.7.0",
    "eslint-plugin-standard": "^3.0.1",
    "mocha": "^5.2.0"
  },
  "engines": {
    "node": ">=8.0.0"
  }
}
```

Para ejecutar los scripts en Sistemas Operativos Windows, reemplazar la propiedad `scripts` con la siguiente información:

```json
{
  "scripts": {
    "start": "node index.js",
    "start-sql": "set SQL_LOG=true&&node index.js",
    "start-prod": "set NODE_ENV=production&&set APIDOC=false&&node index.js",
    "setup": "set SETUP=true&&set START=false&&node index.js",
    "setup-prod": "set NODE_ENV=production&&set SETUP=true&&set START=false&&node index.js",
    "lint": "\"node_modules/.bin/eslint\" index.js src",
    "test": "npm run test-unit && npm run test-integration",
    "test-unit": "set NODE_ENV=test&&\"node_modules/.bin/mocha\" --recursive \"./test/unit/{,/**/}*.spec.js\"",
    "test-integration": "set NODE_ENV=test&&\"node_modules/.bin/mocha\" --recursive \"./test/integration/{,/**/}*.spec.js\""
  }
}
```

### Archivo `README.md`

Contiene información acerca de la aplicación, requerimientos mínimos, guía de instalación, referencias, etc.

### Archivo `yarn.lock`

Archivo utilizado por el manejador de paquetes `yarn` para gestionar las dependencias del proyecto.
