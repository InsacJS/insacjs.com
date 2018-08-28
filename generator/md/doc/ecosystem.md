# Archivo `ecosystem.config.json`

Este archivo es utlizado por `PM2` para desplegar una aplicación de manera continua.

```txt
app
  ├─ ecosystem.config.json
  └─ ecosystem.config.json.example
```

Modo de uso:

```bash
# Instalación
npm install -g pm2

# Despliegue de la aplicación
pm2 start ecosystem.config.json
```

**Ejemplo:**

```json
{
  "apps" : [{
    "name"        : "app",
    "script"      : "index.js",
    "merge_logs"  : false,
    "cwd"         : "./",
    "env" : {
      "HOSTNAME" : "localhost",
      "PORT"     : "4000",
      "NODE_ENV" : "production",
      "DB_USER"  : "postgres",
      "DB_PASS"  : "postgres",
      "DB_NAME"  : "_example",
      "DB_HOST"  : "127.0.0.1",
      "DB_PORT"  : "5432",
      "APIDOC"   : "false"
    },
    "instances"  : 1,
    "exec_mode"  : "cluster_mode"
  }]
}
```

## Comandos útiles

```bash
# Muestra los logs
pm2 logs

# Muestra todas las instancias
pm2 list

# Detiene una instancia
pm2 stop <id>

# Inicia una instancia
pm2 start <id>

# Elimina una instancia
pm2 delete <id>
```

## Referencias externas

Puede encontrar más informción acerca del uso de esta herramienta en el siguiente enlace:

- [Advanced, production process manager for Node.js](http://pm2.keymetrics.io/)
