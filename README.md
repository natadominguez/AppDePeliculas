# Aplicación de búsqueda de películas

Esta aplicación fue desarrollada en el curso "React.js" dictada por Sergie Code en Digital House.

Se utilizó themoviedb API para las películas y Grid para mostrarlas

## Configuración

La aplicación necesita una API key de TheMovieDB, que se carga desde una variable de entorno.

1. Copiá el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

2. Completá `VITE_TMDB_API_KEY` en el `.env` con tu clave, que podés obtener en
   [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

3. Instalá las dependencias y levantá el servidor de desarrollo:

   ```bash
   npm install
   npm run dev
   ```

El archivo `.env` está ignorado por git, así que tu clave nunca se sube al repositorio.
Si la variable no está configurada, la aplicación lo indica en pantalla al iniciar.

# Demo
[Movie App](https://movie-app-natan.netlify.app/)


## Autor - Natanael Dominguez
