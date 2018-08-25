## Carpeta `dao`

Contiene los archivos con extensión `.dao.js`.

Un DAO (Data Access Object) es un archivo que proporciona una interfaz para interactuar con la base de datos. Por convención, cualquier operación con la base de datos debe realizarse a través de este fichero y no asi desde los modelos.

```txt
app
  ├─ src
        ├─ modules
              ├─ AUTH
                    ├─ dao
                          └─ persona.dao.js
```

Modo de uso:
```js
const PERSONA = await app.AUTH.dao.persona.findAll()
```

**Ejemplo.-** Archivo `persona.dao.js`

```js
const { Dao } = require('insac')

module.exports = (app) => {
  const PERSONA = app.AUTH.models.persona
  const DAO     = new Dao(PERSONA)

  // |=============================================================|
  // |----------------- FUNCIONES PREDEFINIDAS --------------------|
  // |=============================================================|

  // DAO.findOne         = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.findAll         = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.count           = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.findAndCountAll = (t, where, not, include = [], paranoid = true) => {}   : Promise
  // DAO.create          = (t, data)                                      => {}   : Promise
  // DAO.update          = (t, data, where, not, paranoid = true)         => {}   : Promise
  // DAO.destroy         = (t, data, where, not, paranoid = true)         => {}   : Promise
  // DAO.restore         = (t, data, where, not)                          => {}   : Promise

  // |=============================================================|
  // |----------------- FUNCIONES PERSONALIZADAS ------------------|
  // |=============================================================|

  // TODO

  return DAO
}
```
