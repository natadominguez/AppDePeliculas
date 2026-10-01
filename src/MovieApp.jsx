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
      <div className="app">
        <header className="hero">
          <h1>Buscador de <span>Películas</span></h1>
        </header>
        <main className="container">
          <p className="notice config-error">
            Falta configurar la API key de TheMovieDB. Copiá el archivo <code>.env.example</code> a{" "}
            <code>.env</code>, definí <code>VITE_TMDB_API_KEY</code> con tu clave y reiniciá el servidor de desarrollo.
          </p>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="hero">
        <h1>Buscador de <span>Películas</span></h1>
        <p className="hero-subtitle">Encontrá cualquier película, su póster y su sinopsis.</p>

        <form className="search-form" onSubmit={handleSubmit}>
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input type="text" placeholder="Busca tu pelicula"
            aria-label="Buscar película"
            value={search}
            onChange={handleInputChange}
            required />

          <button>Buscar</button>
        </form>
      </header>

      <main className="container">
        {movieList?.length === 0 && (
          <p className="notice no-results" role="status">
            No se encontraron películas para «{searchedTerm}».
          </p>
        )}

        {movieList?.length > 0 && (
          <div className="movie-list">
            {movieList.map(movie => (
              <article key={movie.id} className="movie-card">
                <div className="movie-poster">
                  {movie.poster_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} loading="lazy" />
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
                  {movie.vote_average > 0 && (
                    <span className="movie-rating" aria-label={`Puntuación ${movie.vote_average.toFixed(1)} de 10`}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                      </svg>
                      {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  {movie.release_date && <span className="movie-year">{movie.release_date.slice(0, 4)}</span>}
                  <p>{movie.overview?.trim() || "Sin sinopsis disponible"}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        Datos provistos por <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">TheMovieDB</a>
      </footer>
    </div>
  )
}
