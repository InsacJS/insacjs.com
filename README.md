# Página de inicio

Página de inicio del framework Insac JS, contiene tutoriales, referencias y ejemplos.

## Instalación

Clonación e instalación de dependencias

```bash
git clone https://github.com/insacjs/insacjs.com.git
cd insacjs.com
npm install
```

Para generar los módulos de la aplicación

`npm run gen`

Para ejecutar la aplicación en modo development

`npm run start`

Para generar los modulos y ejecutarlo en modo producción

`npm run gen-start`

## Configuración con Docker

Construye el contenedor.

`sudo docker build -t insacjs.com .`

Ejecuta el contenedor.

`sudo docker run -p 80:80 --name app-insacjs.com insacjs.com`

Ejecuta el contenedor de manera continua.

`sudo docker run -p 80:80 --name app-insacjs.com -d insacjs.com`

Acceder al bash del contenedor.

`docker exec -i -t app-insacjs.com /bin/bash`

Muestra todos los contenedores activos e inactivos.

`sudo docker ps -a`

Elimina un contenedor.

`sudo docker rm cd961aa82965`

Muestra todas las imágenes instaladas localmente.

`sudo docker image list`

Elimina una imagen.

`sudo docker rmi 735f80812f90`
