# Estructura del proyecto

Cada archivo tiene una extensión que identifica su propósito.

```txt
blog
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
 ├─ index.js
 ├─ package.json
 └─ README.md
 └─ yarn.lock
```

### Carpeta `.git`

Esta carpeta es gestionada por `GIT`.

### Carpeta `logs`

Contiene archivos de logs que se van creando automáticamente cuando se realizan peticiones.

### Carpeta `node_modules`

Esta carpeta es gestionada por `YARN` y `NPM`. Contiene todas las dependencias que requiere el proyecto.

### Carpeta `public`

Esta carpeta es para almacenar ficheros estáticos, mismos que pueden ser accedidos desde el navegador cuando se ejecuta el servidor.

### Carpeta `public/apidoc`

Contiene el apidoc de aquellos módulos que tengan al menos un recurso.

### Carpeta `src`

Contiene todos los componentes de la aplicación.

### Carpeta `src/config`

Contiene los archivos de configuración del proyecto en general y se aplica para todos los módulos.

### Archivos `*.config.js.example`

Estos archivos son ejemplos de configuración. Pueden ser guardados en el repositorio, ya que por defecto, los archivos `*.config.js` son excluidos al momento de hacer un commit.

Los archivos de configuración son excluidos por contener información sensible, por seguridad nunca deberían subirse valores como una API_KEY al repositorio, en lugar de ello es posible subir un ejemplo con un valor aleatorio.

### Carpeta `src/modules`

Contiene todos los módulos del proyecto.

### Archivo `src/app.js`

Este archivo se encarga de instanciar el servidor y establecer el orden de ejecución de los módulos.

### Carpeta `test`

Esta carpeta contiene las pruebas unitarias y de integración de la aplcación.

### Archivo `.eslintrc.js`

Este archivo es utilizado por `ESLint`, soportado por la mayoría de los editores de código. ESLint es una herramienta que identifica y reporta patrones y errores en código ECMAScript/JavaScrip.

### Archivo `.gitignore`

Este archivo es utilizado por `GIT`. Contiene información acerca de los archivos que serán ignorados por git al momento de subir los cambios al repositorio.

### Archivo `index.js`

Es el primer archivo que se ejecuta cuando se carga la aplicación.

### Archivo `package.json`

Este archivo es utilizado por `NPM`. Contiene los scripts de ejecución e información acerca del proyecto y sus dependencias.

### Archivo `README.md`

Contiene información sobre de la aplicación, requerimientos mínimos, guía de instalación, referencias, etc.

### Archivo `yarn.lock`

Archivo utilizado por `YARN`. Contiene información detallada de todas las dependencias del proyecto.
