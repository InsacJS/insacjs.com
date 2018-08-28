# Archivo `package.json`

Este archivo es utilizado por `NPM`. Contiene los scripts de ejecución e información acerca del proyecto y sus dependencias.

```txt
app
  └─ package.json
```

Modo de uso:

```bash
# con NPM
npm run setup

# Con YARN
yarn setup
```

## Descripción de los scripts

| Nombre             | Descripción                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| `start`            | Inicia la aplicación en modo `development`.                                          |  
| `start-sql`        | Inicia la aplicación en modo `development` y habilita los logs de las consultas SQL. |
| `start-production` | Inicia la aplicación en modo `production`.                                           |
| `setup`            | Instala y configura la base de datos para el modo `development`.                     |
| `setup-production` | Instala y configura la base de datos para el modo `production`.                      |
| `lint`             | Ejecuta el validador de código `ESLint`.                                             |
| `test`             | Ejecuta las pruebas unitarias y de integración.                                      |
| `test-unit`        | Ejecuta las pruebas unitarias.                                                       |
| `test-integration` | Ejecuta las pruebas de integración.                                                  |

## Archivo `package.json` configurado para linux

```json
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "start-sql": "SQL_LOG=true node index.js",
    "start-production": "NODE_ENV=production APIDOC=false node index.js",
    "setup": "SETUP=true START=false node index.js",
    "setup-production": "NODE_ENV=production SETUP=true START=false node index.js",
    "lint": "\"node_modules/.bin/eslint\" index.js src/",
    "test": "npm run test-unit && npm run test-integration",
    "test-unit": "NODE_ENV=test \"node_modules/.bin/mocha\" --recursive \"./test/unit/{,/**/}*.spec.js\"",
    "test-integration": "NODE_ENV=test \"node_modules/.bin/mocha\" --recursive \"./test/integration/{,/**/}*.spec.js\""
  },
  "dependencies": {
    "insac": "^3.0.0"
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

## Archivo `package.json` configurado para windows

```json
{
  "name": "app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "start-sql": "set SQL_LOG=true&&node index.js",
    "start-production": "set NODE_ENV=production&&set APIDOC=false&&node index.js",
    "setup": "set SETUP=true&&set START=false&&node index.js",
    "setup-production": "set NODE_ENV=production&&set SETUP=true&&set START=false&&node index.js",
    "lint": "\"node_modules/.bin/eslint\" index.js src",
    "test": "npm run test-unit && npm run test-integration",
    "test-unit": "set NODE_ENV=test&&\"node_modules/.bin/mocha\" --recursive \"./test/unit/{,/**/}*.spec.js\"",
    "test-integration": "set NODE_ENV=test&&\"node_modules/.bin/mocha\" --recursive \"./test/integration/{,/**/}*.spec.js\""
  },
  "dependencies": {
    "insac": "^3.0.0"
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
