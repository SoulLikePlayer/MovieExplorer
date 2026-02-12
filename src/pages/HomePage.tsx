import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDiscoverMovies } from "../hooks/useDiscoverMovies";
import MovieFilters from "../components/MovieFilters";

function HomePage() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  
  const { 
    movies, 
    loading, 
    totalResults, 
    totalPages, 
    currentPage, 
    setCurrentPage,
    setFilters,
    filters 
  } = useDiscoverMovies({
    sortBy: 'popularity.desc',
    includeAdult: false
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ ...filters, query: searchInput, page: 1 });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...newFilters, page: 1 });
  };

  const handleSelectMovie = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="app-container">
      <h1 style={{ 
        textAlign: "center", 
        marginBottom: "var(--space-8)",
        fontSize: "var(--text-4xl)",
        fontWeight: "700",
        color: "var(--ff-text)"
      }}>
        Découverte de films
      </h1>
      
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un film par titre..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Rechercher
          </button>
        </div>
      </form>

      <MovieFilters 
        activeFilters={filters}
        onFilterChange={handleFilterChange}
      />

      {totalResults > 0 && !loading && (
        <p className="results-count">
          {totalResults} film{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
        </p>
      )}

      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p style={{ fontSize: "var(--text-lg)" }}>Chargement des films...</p>
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div className="empty-state">
          <h3>Aucun film trouvé</h3>
          <p>Essayez de modifier vos filtres ou votre recherche</p>
        </div>
      )}

      <div className="movies-grid">
        {movies.map((movie) => (
          <div 
            key={movie.id}
            className="movie-card"
            onClick={() => handleSelectMovie(movie.id)}
          >
            <div className="movie-poster">
              <img
                src={movie.poster_path 
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={movie.title}
              />
              <div className="movie-rating">
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">
                {movie.release_date?.split('-')[0] || "N/A"}
              </p>
              <p className="movie-overview">
                {movie.overview || "Aucune description disponible"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ← Précédent
          </button>
          <span className="pagination-info">
            Page {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant →
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;