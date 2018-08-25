# Carpeta `seeders`

Contiene archivos con extensión `.seed.js`.

```txt
app
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ seeders
                          └─ production
                          │     └─ persona.seed.js
                          └─ persona.seed.js
```

Estos archivos cargan con la ejecución del script `npm run setup`.

## Carpeta `seeders/production`

Esta carpeta contiene los seeders que serán ejecutados en ambientes de producción.

Estos archivos cargan con la ejecución del script `npm run setup-production`.
