# Ruta con un `Sistema de filtros`

Todos los controladores tienen acceso a un objeto `options` que se encuentra en el `req` de la petición. Este objeto puede ser utilizado para realizar consultas con la base de datos.

Este objeto se crea automáticamente utilizando el formato del objeto `OUTPUT` y los parámetros de consulta enviados a través de la URL.

De esta forma, es posible crear un [Sistema de filtros](./referencias/filters), el cual permite realizar peticiones de una manera mas óptima.

## Definición de modelos

```js
const AUTOR = sequelize.define('autor', {
  id_autor : Field.ID(),
  nombre   : Field.STRING(),
  ci       : Field.INTEGER(),
  telefono : Field.INTEGER()
})

const LIBRO = sequelize.define('libro', {
  id_libro : Field.ID(),
  titulo   : Field.STRING(),
  precio   : Field.FLOAT()
})

AUTOR.hasMany(LIBRO, { as: 'libros', foreignKey: { name: 'fid_autor' } })
LIBRO.belongsTo(AUTOR, { as: 'autor', foreignKey: { name: 'fid_autor', targetKey: 'id_autor' } })
```

## Formato del objeto `OUTPUT`

```js
OUTPUT.get = Field.group(LIBRO, [{
  id_libro : THIS(),
  titulo   : THIS(),
  precio   : THIS(),
  autor    : {
    id_autor : THIS(),
    nombre   : THIS()
  }
}])

OUTPUT.getId = OUTPUT.get[0]
```

## Formato del objeto `INPUT`

Para que funcione correctamente, debe incluir los siguientes campos en el objeto `INPUT`:

```js
INPUT.get = {
  query : {
    fields : Field.FIELDS(),
    limit  : Field.LIMIT(),
    order  : Field.ORDER(),
    page   : Field.PAGE()
  }
}

INPUT.getId = {
  query: {
    fields : Field.FIELDS(),
    limit  : Field.LIMIT(),
    order  : Field.ORDER(),
    page   : Field.PAGE()
  },
  params: {
    id: Field.ID()
  }
}
```

Luego definir los controladores de la siguiente forma:

## Definición de los controladores

```js
CONTROLLER.get = async (req, res, next) => {
  try {
    const OPTIONS = req.options
    const RESULTADO = await app.API.dao.libro._findAndCountAll(null, OPTIONS)
    return res.success200(RESULTADO.rows, 'La lista de libros ha sido obtenida con éxito.', util.metadata(req, RESULTADO))
  } catch (err) { return next(err) }
}

CONTROLLER.getId = async (req, res, next) => {
  try {
    const OPTIONS = req.options
    const ID_LIBRO = req.params.id
    OPTIONS.where = { id: ID_LIBRO }
    const RESULTADO = await app.API.dao.libro._findOne(null, OPTIONS)
    return res.success200(RESULTADO, 'El libro ha sido obtenido con éxito.')
  } catch (err) { return next(err) }
}
```

## Ejemplo de uso en una petición

```bash
curl http://example.com/api/v1/libros?fields=id_libro,titulo
curl http://example.com/api/v1/libros?fields=id_libro,titulo&order=-precio
curl http://example.com/api/v1/libros?limit=30&page=2
```
