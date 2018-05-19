# Mi Primer Proyecto

Para crear este proyecto, se utilizará la herramienta de línea de comandos `insac-cli` y el manejador de paquetes `yarn`.

## Instalación

```bash
npm install -g insac-cli yarn
```

## Creación del proyecto

```bash
insac new blog
cd blog
yarn install
```

## Estructura inicial del proyecto

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
 │     └─ app.log
 ├─ src
 │     ├─ config
 │     |     └─ app.config.js
 │     |     └─ example.app.config.js
 │     ├─ modules
 │     └─ app.js
 ├─ test
 │     ├─ integration
 │     |     └─ Example.spec.js
 │     ├─ unit
 │     |     └─ Example.spec.js
 │     ├─ helpers.js
 │     └─ mocha.opts
 ├─ .eslintrc.js
 ├─ .gitignore
 ├─ ecosystem.json
 ├─ example.ecosystem.json
 ├─ index.js
 ├─ package.json
 ├─ README.md
 └─ yarn.lock
```

Adicion de un nuevo módulo

`insac add:module api`

Esto nos generará la siguiente carpeta:

```txt
 ├─ src
       ├─ modules
             └─ API
                   ├─ dao
                   ├─ models
                   ├─ resources
                   ├─ seeders
                   |     └─ prod
                   └─ api.module.js
```

Creación de modelos `persona` y `post`, en base al siguiente diagrama:

```txt
  ┌───────────────┐         ┌───────────────┐
  │    PERSONA    │         │     POST      |
  ├───────────────┤ 1       ├───────────────┤
  │ id_persona    ├────┐    │ id_post       |
  │ nombre        │    │    │ titulo        │
  │ telefono      │    │    │ fecha         │
  │ email         │    │  N │ descripcion   │
  │               │    └───>│ fid_autor     │
  └───────────────┘         └───────────────┘
```

Creación de los modelos. Los DAO se generan de manera automática.

```bash
insac add:model persona --fields nombre,telefono,email

insac add:model post --fields titulo,fecha:DATE,descripcion:TEXT -e
```

El flag `-e` incluye dentro del modelo un ejemplo de asociación.

Hasta aquí, ya se tienen los archivos con la configuración básica, realizando algunas modificaciones, tenemos lo siguiente:

Archivo `persona.model.js`

```js
const { Field } = require(insac)

module.exports = (sequelize, Sequelize) => {
  const MODEL = sequelize.define('persona', {
    id_persona: Field.ID({
      comment: 'ID persona.'
    }),
    nombre: Field.STRING({
      comment : 'Nombre completo de la persona.',
      example : 'John Smith'
    }),
    telefono: Field.STRING({
      comment : 'Número de telefono o celular.',
      example : '78885768'
    }),
    email                 : Field.EMAIL,
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

Archivo `post.model.js`

```js
const { Field } = require(insac)

module.exports = (sequelize, Sequelize) => {
  const MODEL = sequelize.define('post', {
    id_post: Field.ID({
      comment: 'ID post.'
    }),
    titulo: Field.STRING({
      comment : 'Título del post.',
      example : 'Inteligencia Artificial'
    }),
    fecha: Field.DATE({
      comment: 'Fecha de publicación.'
    }),
    descripcion: Field.TEXT({
      comment : 'Contenido del post.',
      example : 'La inteligencia artificial ...'
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
    const PERSONA = app.API.models.persona
    const POST    = app.API.models.post

    POST.belongsTo(PERSONA, { as: 'autor', foreignKey: { name: 'fid_autor', targetKey: 'id_persona' } })
    PERSONA.hasMany(POST,   { as: 'posts', foreignKey: { name: 'fid_autor' } })
  }

  // Ejemplo.-
  //
  // ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
  // │    LIBRO    │         │    AUTOR    |         │   PERSONA   │
  // ├─────────────┤       1 ├─────────────┤       1 ├─────────────┤
  // │ id_libro    │ N  ┌────┤ id_autor    | 1  ┌────┤ id_persona  │
  // │ fid_autor   │<───┘    │ fid_persona │<───┘    │             │
  // └─────────────┘         └─────────────┘         └─────────────┘
  //
  // LIBRO.belongsTo(AUTOR, { as: 'autor',  foreignKey: { name: 'fid_autor', targetKey: 'id_autor' } })
  // AUTOR.hasMany(LIBRO,   { as: 'libros', foreignKey: { name: 'fid_autor' } })
  //
  // AUTOR.belongsTo(PERSONA, { as: 'persona', foreignKey: { name: 'fid_persona', targetKey: 'id_persona', allowNull: false } })
  // PERSONA.hasOne(AUTOR,    { as: 'autor',   foreignKey: { name: 'fid_persona' } })

  return MODEL
}
```

Podemos crear algunos seeders para insertar algunos datos por defecto en la base de datos:

```bash
insac add:seed -m persona
insac add:seed -m post
```

Ahora, procedemos la generación de un CRUD básico.

```bash
insac gen:resource api/v1/personas -m persona --level 2
insac gen:resource api/v1/posts -m post --level 2
```

La estructura del modulo queda de la siguiente forma:

```txt
├─ src
      ├─ modules
            └─ API
                  ├─ dao
                  |     ├─ persona.dao.js
                  |     └─ post.dao.js
                  ├─ models
                  |     ├─ persona.model.js
                  |     └─ post.model.js
                  ├─ resources
                  |     └─ api
                  |           └─ v1
                  |                 ├─ personas
                  |                 |     ├─ persona.controller.js
                  |                 |     ├─ persona.input.js
                  |                 |     ├─ persona.middleware.js
                  |                 |     ├─ persona.output.js
                  |                 |     └─ persona.route.js
                  |                 └─ posts
                  |                       ├─ post.controller.js
                  |                       ├─ post.input.js
                  |                       ├─ post.middleware.js
                  |                       ├─ post.output.js
                  |                       └─ post.route.js
                  ├─ seeders
                  |     ├─ prod
                  |     ├─ persona.seed.js
                  |     └─ post.seed.js
                  └─ api.module.js
```

Listo, ya podemos instalar y ejecutar la aplicación, para esto debemos actualizar los datos de configuración de la base de datos y del servidor los cuales se encuentran en el archivo `app.config.js`.

Una vez que se hayan establecido las credenciales de acceso a la base de datos, procedemos con la instalación.

`yarn setup`

```bash
$ SETUP=true node index.js

 |===============================================|
 |======   I N S A C   F R A M E W O R K   ======|
 |===============================================|

 |===============================================|
 |---------   INSTALANDO   APLICACIÓN   ---------|
 |===============================================|

 - CREATE DATABASE blog ✓

 - CREATE SCHEMA api ✓

 Módulo API ...

 - DROP TABLE persona ✓
 - DROP TABLE post ✓

 - CREATE TABLE persona ✓
 - CREATE TABLE post ✓

 - SEED persona ✓
 - SEED post ✓

 API ✓

 - Instalación finalizada correctamente.
```

Ahora ejecutamos la aplicación:

`yarn start`

```bash
$ node index.js

 |===============================================|
 |======   I N S A C   F R A M E W O R K   ======|
 |===============================================|

 |===============================================|
 |-------   INICIALIZANDO   APLICACIÓN   --------|
 |===============================================|

 Módulo API ...

 [GET]    /api/v1/personas ....................... get
 [GET]    /api/v1/personas/:id_persona ........... getId
 [POST]   /api/v1/personas ....................... create
 [PUT]    /api/v1/personas/:id_persona ........... update
 [DELETE] /api/v1/personas/:id_persona ........... destroy
 [PUT]    /api/v1/personas/:id_persona/restore ... restore

 [GET]    /api/v1/posts .................... get
 [GET]    /api/v1/posts/:id_post ........... getId
 [POST]   /api/v1/posts .................... create
 [PUT]    /api/v1/posts/:id_post ........... update
 [DELETE] /api/v1/posts/:id_post ........... destroy
 [PUT]    /api/v1/posts/:id_post/restore ... restore


 API ✓

 Crear APIDOC ✓

 Servicio activo en modo development

 - [service] http://localhost:4000
 - [apidoc]  http://localhost:4000/apidoc
```
