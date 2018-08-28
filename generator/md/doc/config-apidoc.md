# Archivo `apidoc.config.js`

```txt
app
  ├─ src
        ├─ config
              ├─ apidoc.config.js
```

Configuración por defecto:

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
