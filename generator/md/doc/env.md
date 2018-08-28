# Variables de entorno

Variables de entorno que utiliza la aplicación.

## SERVER

```js
process.env.START    // Cargar los componentes de la aplicación.                Ej.- process.env.START = 'true'
process.env.LISTEN   // Ejecuta el listen del servidor al cargar la aplicación. Ej.- process.env.LISTEN ='true'

process.env.PROTOCOL // Protocolo utilizado por el servidor.                    Ej.- process.env.PROTOCOL = 'http'

process.env.HOSTNAME // Nombre del host.                                        Ej.- process.env.HOSTNAME = 'localhost'
process.env.PORT     // Puerto del host.                                        Ej.- process.env.PORT = '4000'
process.env.NODE_ENV // Entorno de ejecución.                                   Ej.- process.env.NODE_ENV = 'production'
```

## DATABASE

```js
process.env.SQL_LOG // Habilita los logs de las consultas SQL.        Ej.- process.env.SQL_LOGS = 'true'
process.env.SETUP   // Habilita la configuración de la base de datos. Ej.- process.env.SETUP = 'true'

process.env.DB_NAME // Nombre de la base de datos.                    Ej.- process.env.DB_NAME = 'postgres'
process.env.DB_USER // Nombre del usuario de la base de datos.        Ej.- process.env.DB_USER = 'postgres'
process.env.DB_PASS // Contraseña del usuario de la base de datos.    Ej.- process.env.DB_PASS = 'postgres'

process.env.DIALECT // Gestor de base de datos.                       Ej.- process.env.DIALECT = 'postgres'
process.env.DB_HOST // Nombre del host de la base de datos.           Ej.- process.env.DB_HOST = '127.0.0.1'
process.env.DB_PORT // Puerto del servidor de base de datos.          Ej.- process.env.DB_PORT = '5432'
process.env.DB_TZ   // TIMEZONE de la base de datos.                  Ej.- process.env.DB_TZ = '-04:00'
```

## LOGGER

```js
process.env.COLORS    // Hablita los colores de los logs. Ej.- process.env.COLORS    = 'true'
process.env.LOGGER    // Habilita los logs.               Ej.- process.env.LOGGER    = 'true'
process.env.LOG_LEVEL // Nivel de logs de la consola.     Ej.- process.env.LOG_LEVEL = 'silly'
```

## APIDOC

```js
process.env.APIDOC // Habilita la creación del apidoc. Ej.- process.env.APIDOC = 'true'
```
