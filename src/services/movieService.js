const API_BASE_URL = "https://api.themoviedb.org/3"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const LANGUAGE = "es-ES"

export const isApiKeyConfigured = Boolean(API_KEY)

export const getPosterUrl = (posterPath) => `${IMAGE_BASE_URL}${posterPath}`

export const searchMovies = async (query) => {
  if (!isApiKeyConfigured) {
    throw new Error("Falta configurar VITE_TMDB_API_KEY con la API key de TheMovieDB.")
  }

  const url = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=${LANGUAGE}`

  let response
  try {
    response = await fetch(url)
  } catch (error) {
    throw new Error("No se pudo conectar con TheMovieDB. Revisá tu conexión a internet.", { cause: error })
  }

  if (!response.ok) {
    throw new Error(`TheMovieDB respondió con el estado ${response.status} al buscar «${query}».`)
  }

  try {
    const data = await response.json()
    return data.results ?? []
  } catch (error) {
    throw new Error("La respuesta de TheMovieDB no tiene un formato válido.", { cause: error })
  }
}
