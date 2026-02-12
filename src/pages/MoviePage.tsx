import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetail';

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetails(Number(id));

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Chargement du film...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="error-container">
        <h2>Erreur</h2>
        <p>{error || "Film introuvable"}</p>
        <a href="/" className="back-link">← Retour à l'accueil</a>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const year = movie.release_date?.split('-')[0] || 'Année inconnue';
  const vote = movie.vote_average.toFixed(1);
  const runtime = movie.runtime 
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min` 
    : 'Durée inconnue';

  return (
    <div className="movie-page">
      {backdropUrl && (
        <div 
          className="backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}
      
      <div className="movie-content">
        <div className="movie-poster">
          <img src={posterUrl} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h1>{movie.title} <span className="year">({year})</span></h1>
          
          <div className="tagline">{movie.tagline}</div>

          <div className="stats">
            <div className="stat-item">
              <span className="label"> Note</span>
              <span className="value">{vote}/10</span>
            </div>
            <div className="stat-item">
              <span className="label">Sortie</span>
              <span className="value">{new Date(movie.release_date).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="stat-item">
              <span className="label">Durée</span>
              <span className="value">{runtime}</span>
            </div>
            <div className="stat-item">
              <span className="label">Statut</span>
              <span className="value">{movie.status}</span>
            </div>
          </div>

          <div className="genres">
            {movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="overview">
            <h2>Synopsis</h2>
            <p>{movie.overview || "Aucun synopsis disponible."}</p>
          </div>

          <div className="production">
            <h2>Production</h2>
            <div className="production-companies">
              {movie.production_companies?.slice(0, 5).map(company => (
                <div key={company.id} className="company">
                  {company.logo_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                    />
                  ) : (
                    <span>{company.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <a href="/" className="back-home">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}