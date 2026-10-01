import { useState } from "react"
import "./MovieApp.css"

export const MovieApp = () => {

  const [search, setSearch] = useState('')
  const [movieList, setMovieList] = useState(null)
  const [searchedTerm, setSearchedTerm] = useState('')

  const urlBase = "https://api.themoviedb.org/3/search/movie"
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const handleInputChange = ({target}) => {
    setSearch(target.value)    
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    if (!search.trim()) return
    fetchMovies()
  }

  const fetchMovies = async () => {
    try {
      const query = search.trim()
      const response = await fetch(`${urlBase}?query=${encodeURIComponent(query)}&api_key=${API_KEY}&language=es-ES`)
      const data = await response.json()
      setSearchedTerm(query)
      setMovieList(data.results)
    } catch (error) {
      console.error("Ha ocurrido el siguiente error:", error)
    }
  }

  if (!API_KEY) {
    return (
      <div className="container">
        <h1>Buscador de Películas</h1>
        <p className="config-error">
          Falta configurar la API key de TheMovieDB. Copiá el archivo <code>.env.example</code> a{" "}
          <code>.env</code>, definí <code>VITE_TMDB_API_KEY</code> con tu clave y reiniciá el servidor de desarrollo.
        </p>
      </div>
    )
  }

  return (
    <div className="container">
        <h1>Buscador de Películas</h1>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Busca tu pelicula"
            value={search}
            onChange={handleInputChange}
            required />

            <button>Buscar</button>
        </form>

        {movieList?.length === 0 && (
          <p className="no-results" role="status">
            No se encontraron películas para «{searchedTerm}».
          </p>
        )}

        {movieList?.length > 0 && (
          <div className="movie-list">
            {movieList.map(movie => (
              <div key={movie.id} className="movie-card">
                {movie.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                ) : (
                  <div className="poster-placeholder" role="img" aria-label={`${movie.title}: sin imagen disponible`}>
                    <svg className="poster-placeholder-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <circle cx="9" cy="10" r="1.5" />
                      <path d="M21 16l-5-5-8 8" />
                    </svg>
                    <span>Sin imagen disponible</span>
                  </div>
                )}
                <h2>{movie.title}</h2>
                <p>{movie.overview?.trim() || "Sin sinopsis disponible"}</p>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
