# Estructura del proyecto

Cada archivo tiene una extensión que identifica su propósito.

```txt
app
  ├─ .git
  ├─ logs
  │     ├─ error
  │     │     └─ app.error.log
  │     └─ info
  │           └─ app.info.log
  ├─ node_modules
  ├─ public
  │     └─ apidoc
  │           ├─ API
  │           └─ AUTH
  ├─ src
  │     ├─ config
  │     │     ├─ database.config.js
  │     │     ├─ database.config.js.example
  │     │     ├─ server.config.js
  │     │     └─ server.config.js.example
  │     ├─ hooks
  │     │     ├─ app.after.hook.js
  │     │     └─ app.before.hook.js
  │     ├─ modules
  │     │     └─ API
  │     │           └─ api.module.js
  │     ├─ tools
  │     │     └─ util.tool.js
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
  ├─ ecosystem.config.json
  ├─ ecosystem.config.json.example
  ├─ index.js
  ├─ package.json
  ├─ README.md
  └─ yarn.lock
```

## Descripción del contenido

| Nombre           | Descripción                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| `.git`           | Esta carpeta es gestionada por `GIT`.                                                                        |
| `logs`           | Contiene archivos de logs. Estos archivos se van creando automáticamente cuando se realizan peticiones. Ver: [Carpeta logs](./doc/logger#carpeta-logs) |
| `node_modules`   | Contiene todas las dependencias que requiere el proyecto.                                                    |
| `public`         | Esta carpeta es para almacenar ficheros estáticos, mismos que pueden ser accedidos desde el navegador cuando se ejecuta el servidor. |
| `public.apidoc`  | Contiene el apidoc de aquellos módulos que tengan al menos un recurso.                                       |
| `src`            | Contiene todos los componentes de la aplicación.                                                             |
| `src/config`     | Contiene todos los archivos de configuración a nivel de aplicación. Ver: [Carpeta config](./doc/config#carpeta-config)                                         |
| `src/hooks`      | Contiene archivos que se ejecutan antes y después de cargar la aplicación. Ver: [Hooks a nivel de aplicación](./doc/hooks#hooks-a-nivel-de-aplicacion) |
| `src/modules`    | Contiene todos los módulos de la aplicación. Ver: [Carpeta modules](./doc/modules#carpeta-modules) |
| `src/tools`      | Contiene archivos utilitarios. Ver: [Carpeta tools](./doc/tools#tools-a-nivel-de-aplicacion) |
| `src/app.js`     | Este archivo se encarga de instanciar la aplicación y establecer el orden de ejecución de los módulos. Ver: [Archivo app.js](./doc/app#archivo-appjs) |
| `test`           | Esta carpeta contiene las pruebas unitarias y de integración de la aplcación. Ver: [Carpeta test](./doc/test#carpeta-test) |
| ``.eslintrc.js`` | Este archivo es utilizado por `ESLint`, soportado por la mayoría de los editores de código. ESLint es una herramienta que identifica y reporta patrones y errores en código ECMAScript/JavaScrip. |
| `.gitignore`     | Contiene información acerca de los archivos que serán ignorados por git al momento de subir los cambios al repositorio. |
| `ecosystem.config.json` | Este archivo es utilizado por `PM2` para desplegar aplicaciones de manera continua. Ver: [Archivo ecosystem.config.js](./doc/ecosystem#archivo-ecosystemconfigjson) |
| `index.js`       | Es el primer archivo que se ejecuta cuando se carga la aplicación.                                           |
| `package.json`   | Contiene los scripts de ejecución e información acerca del proyecto y sus dependencias. Ver: [Archivo package.json](./doc/package#archivo-packagejson) |
| `README.md`      | Contiene información sobre de la aplicación, requerimientos mínimos, guía de instalación, referencias, etc.  |
| `yarn.lock`      | Archivo utilizado por `YARN`. Contiene información detallada de todas las dependencias del proyecto.         |
