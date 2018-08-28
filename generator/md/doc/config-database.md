# Archivo `database.config.js`

```txt
app
  ├─ src
        ├─ config
              ├─ database.config.js
```

Configuración por defecto:

```js
const DATABASE = {
  setup  : false,
  sqlLog : false,

  username : 'postgres',
  password : 'postgres',
  database : '_example',

  // http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor
  params: {
    dialect          : 'postgres',    // postgres, mysql, mssql, sqlite
    host             : '127.0.0.1',
    port             : 5432,          // postgres: 5432, mysql: 3306, mssql: 1433
    timezone         : '-04:00',
    lang             : 'es',
    logging          : false,         // Valor asignado automáticamente según la propiedad 'DATABASE.sqlLog'
    operatorsAliases : false,

    define: {
      underscored     : true,
      freezeTableName : true,
      timestamps      : true,
      paranoid        : true,
      createdAt       : '_fecha_creacion',
      updatedAt       : '_fecha_modificacion',
      deletedAt       : '_fecha_eliminacion'
    }
  },

  // Para controlar la instalación de la base de datos
  onSetup: {
    modules: [],              // modules: ['API', 'AUTH']

    dropDatabase   : false,
    createDatabase : true,

    dropSchemas   : false,
    createSchemas : true,

    dropTables   : true,
    createTables : true,

    createSeeders: true
  }
}

module.exports = DATABASE
```
