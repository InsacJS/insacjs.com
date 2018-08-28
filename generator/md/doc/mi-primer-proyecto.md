# Mi Primer Proyecto

Para este proyecto, se utilizará la herramienta `insac-cli`.

```bash
npm install -g insac-cli
```

## Procedimiento

1.  [Creación del proyecto](#title-3)

  ```bash
  insac new blog
  ```

2. [Adición de un módulo](#title-4)

  ```bash
  insac add:module api
  ```

3. [Adición de modelos](#title-5)

  ```bash
  insac add:model persona --fields nombre,telefono,email
  insac add:model post --fields titulo,fecha:DATE,descripcion:TEXT -e
  ```

4. [Adición de seeders](#title-6)

  ```bash
  insac add:seed persona
  insac add:seed post
  ```

5. [Generación de recursos CRUD](#title-7)

  ```bash
  insac gen:resource api/v1/personas -m persona --output-depth 2
  insac gen:resource api/v1/posts -m post --output-depth 2
  ```

6. [Instalación de la aplicación](#title-8)

  ```bash
  npm run setup
  ```

7. [Despliegue de la aplicación](#title-9)

  ```bash
  npm run start
  ```

## 1. Creación del proyecto

```bash
$ insac new blog
$ cd blog
```

Estructura inicial del proyecto:

```txt
blog
  ├─ .git
  ├─ node_modules
  ├─ src
  │     ├─ config
  │     │     ├─ database.config.js
  │     │     ├─ database.config.js.example
  │     │     ├─ server.config.js
  │     │     └─ server.config.js.example
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
  ├─ index.js
  ├─ package.json
  ├─ README.md
  └─ yarn.lock
```

## 2. Adición de un módulo

```bash
$ insac add:module api
```

```txt
blog
  ├─ src
        └─ modules
              └─ API
                    └─ api.module.js
```

## 3. Adición de modelos

Se utilizarán los modelos `persona` y `post`, según el siguiente diagrama:

```txt
  ┌───────────────┐         ┌───────────────┐
  │    PERSONA    │         │     POST      │
  ├───────────────┤ 1       ├───────────────┤
  │ id_persona    ├────┐    │ id_post       │
  │ nombre        │    │    │ titulo        │
  │ telefono      │    │    │ fecha         │
  │ email         │    │  N │ descripcion   │
  │               │    └───>│ fid_autor     │
  └───────────────┘         └───────────────┘
```

```bash
insac add:model persona --fields nombre,telefono,email
insac add:model post --fields titulo,fecha:DATE,descripcion:TEXT
```

```txt
API
  ├─ dao
  │     ├─ persona.dao.js
  │     └─ post.dao.js
  └─ models
        ├─ persona.model.js
        └─ post.model.js
```

Archivo `persona.model.js`

```js
const { Field } = require('insac')

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
    email: Field.STRING({
      comment  : 'Dirección de correo electrónico.',
      example  : 'example@gmail.com',
      validate : { isEmail: true }
    }),
    _estado               : Field.STATUS(),
    _usuario_creacion     : Field.CREATED_USER(),
    _usuario_modificacion : Field.UPDATED_USER(),
    _usuario_eliminacion  : Field.DELETED_USER(),
    _fecha_creacion       : Field.CREATED_AT(),
    _fecha_modificacion   : Field.UPDATED_AT(),
    _fecha_eliminacion    : Field.DELETED_AT()
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
const { Field } = require('insac')

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
    _estado               : Field.STATUS(),
    _usuario_creacion     : Field.CREATED_USER(),
    _usuario_modificacion : Field.UPDATED_USER(),
    _usuario_eliminacion  : Field.DELETED_USER(),
    _fecha_creacion       : Field.CREATED_AT(),
    _fecha_modificacion   : Field.UPDATED_AT(),
    _fecha_eliminacion    : Field.DELETED_AT()
  }, {
    schema: 'api'
  })

  MODEL.associate = (app) => {
    const PERSONA = app.API.models.persona
    const POST    = app.API.models.post

    POST.belongsTo(PERSONA, { as: 'autor', foreignKey: { name: 'fid_autor', targetKey: 'id_persona' } })
    PERSONA.hasMany(POST,   { as: 'posts', foreignKey: { name: 'fid_autor' } })
  }

  return MODEL
}
```

## 4. Adición de seeders

```bash
insac add:seed persona
insac add:seed post
```

```txt
API
  └─ seeders
        ├─ persona.seed.js
        └─ post.seed.js
```

## 5. Generación de recursos CRUD

```bash
insac gen:resource api/v1/personas -m persona --output-depth 2
insac gen:resource api/v1/posts -m post --output-depth 2
```

```txt
API
  ├─ resources
        └─ api
              └─ v1
                    ├─ personas
                    │     ├─ persona.controller.js
                    │     ├─ persona.input.js
                    │     ├─ persona.middleware.js
                    │     ├─ persona.output.js
                    │     └─ persona.route.js
                    └─ posts
                          ├─ post.controller.js
                          ├─ post.input.js
                          ├─ post.middleware.js
                          ├─ post.output.js
                          └─ post.route.js
```

## 6. Instalación de la aplicación

Actualizar los valores de configuración de la base de datos:

Archivo: `src/config/database.config.js`

Después de configurar la base de datos:

```bash
$ npm run setup
> SETUP=true START=false node index.js

   =====================================   
     ---------------------------------     
       I N S A C   F R A M E W O R K       
     =================================     
   -------------------------------------   

               Versión 3.0.0               


 Sistema : Blog
 Versión : 1.0.0
 Entorno : development


 [archivo] /src/modules/API/api.module.js ✓


 CONFIGURACIÓN INICIAL
 =====================

 [archivo] app.before.hook.js (default) ✓


 INSTALANDO APLICACIÓN
 =====================

 CREATE DATABASE _example ... ✓


 Módulo API ...

 [archivo] /src/modules/API/models/persona.model.js ✓
 [archivo] /src/modules/API/models/post.model.js ✓

 CREATE SCHEMA api ... ✓

 DROP TABLE api.persona ... (No existe) ✓
 DROP TABLE api.post ...... (No existe) ✓

 CREATE TABLE api.persona ... ✓
 CREATE TABLE api.post ...... ✓

 [archivo] /src/modules/API/seeders/persona.seed.js ✓

 BULK INSERT api.persona [1 registro] ...

 [resultado] persona.seed.js  (Se insertó 1 registro en 0.024 seg.) ✓

 [archivo] /src/modules/API/seeders/post.seed.js ✓

 BULK INSERT api.post [1 registro] ...

 [resultado] post.seed.js ... (Se insertó 1 registro en 0.008 seg.) ✓


 CONFIGURACIÓN FINAL
 ===================

 [archivo] app.after.hook.js (default) ✓

 [apidoc] Módulo API ... ✓


 La aplicación ha sido instalada con éxito.  
```

## 7. Despliegue de la aplicación

```bash
$ npm run start
> node index.js

   =====================================   
     ---------------------------------     
       I N S A C   F R A M E W O R K       
     =================================     
   -------------------------------------   

               Versión 3.0.0               


 Sistema : Blog
 Versión : 1.0.0
 Entorno : development


 [archivo] /src/modules/API/api.module.js ✓


 CONFIGURACIÓN INICIAL
 =====================

 [archivo] app.before.hook.js (default) ✓


 CARGANDO APLICACIÓN
 ===================


 Módulo API ...

 [archivo] /src/modules/API/models/persona.model.js ✓
 [archivo] /src/modules/API/models/post.model.js ✓

 [archivo] /src/modules/API/dao/persona.dao.js ✓
 [archivo] /src/modules/API/dao/post.dao.js ✓

 [archivo] /src/modules/API/resources/api/v1/personas/personas.route.js ✓
 [archivo] /src/modules/API/resources/api/v1/personas/personas.input.js ✓
 [archivo] /src/modules/API/resources/api/v1/personas/personas.output.js ✓
 [archivo] /src/modules/API/resources/api/v1/personas/personas.middleware.js ✓
 [archivo] /src/modules/API/resources/api/v1/personas/personas.controller.js ✓

 [ruta] GET    /api/v1/personas ....................... get ✓
 [ruta] GET    /api/v1/personas/:id_persona ........... getId ✓
 [ruta] POST   /api/v1/personas ....................... create ✓
 [ruta] PUT    /api/v1/personas/:id_persona ........... update ✓
 [ruta] DELETE /api/v1/personas/:id_persona ........... destroy ✓
 [ruta] PUT    /api/v1/personas/:id_persona/restore ... restore ✓

 [archivo] /src/modules/API/resources/api/v1/posts/posts.route.js ✓
 [archivo] /src/modules/API/resources/api/v1/posts/posts.input.js ✓
 [archivo] /src/modules/API/resources/api/v1/posts/posts.output.js ✓
 [archivo] /src/modules/API/resources/api/v1/posts/posts.middleware.js ✓
 [archivo] /src/modules/API/resources/api/v1/posts/posts.controller.js ✓

 [ruta] GET    /api/v1/posts .................... get ✓
 [ruta] GET    /api/v1/posts/:id_post ........... getId ✓
 [ruta] POST   /api/v1/posts .................... create ✓
 [ruta] PUT    /api/v1/posts/:id_post ........... update ✓
 [ruta] DELETE /api/v1/posts/:id_post ........... destroy ✓
 [ruta] PUT    /api/v1/posts/:id_post/restore ... restore ✓


 CONFIGURACIÓN FINAL
 ===================

 [archivo] app.after.hook.js (default) ✓

 [apidoc] Módulo API ... ✓


 La aplicación ha sido cargada con éxito.  


 EJECUTANDO APLICACIÓN
 =====================

 [SERVICIO] http://localhost:4000 ✓
 [APIDOC]   http://localhost:4000/apidoc/API ✓
```

Resultado:

## `http://localhost:4000`

![Captura 01](assets/img/mi-primer-proyecto/blog/captura01.jpg)

## `http://localhost:4000/apidoc/API`

![Captura 02](assets/img/mi-primer-proyecto/blog/captura02.jpg)
