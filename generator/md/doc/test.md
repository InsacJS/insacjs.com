# Carpeta `test`

Esta carpeta contiene las pruebas unitarias y de integración de la aplcación.

```txt
app
  ├─ test
        ├─ integration
        │     └─ Example.spec.js
        ├─ unit
        │     └─ Example.spec.js
        ├─ helpers.js
        └─ mocha.opts
```

Modo de uso:

```bash
# Todas las pruebas
npm run test

# Pruebas unitarias
npm run test-unit

# Pruebas de integración
npm run test-integration
```
