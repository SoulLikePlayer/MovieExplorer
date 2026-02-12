import { useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetail';

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error } = useMovieDetails(Number(id));

  if (loading) {
    return (
      <div className="loading-state" style={{ height: '100vh' }}>
        <div className="loading-spinner"></div>
        <p style={{ fontSize: 'var(--text-lg)' }}>Chargement du film...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="empty-state" style={{ margin: 'var(--space-16) auto', maxWidth: '600px' }}>
        <h2 style={{ color: 'var(--ff-text)', marginBottom: 'var(--space-4)' }}>Erreur</h2>
        <p style={{ marginBottom: 'var(--space-6)' }}>{error || "Film introuvable"}</p>
        <a href="/" className="back-button">
          ← Retour à l'accueil
        </a>
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
  const runtime = movie.runtime 
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min` 
    : 'Durée inconnue';

  return (
    <div className="movie-detail">
      {backdropUrl && (
        <div 
          className="backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}
      
      <div className="detail-content">
        <div>
          <img 
            src={posterUrl} 
            alt={movie.title}
            className="detail-poster"
          />
        </div>

        <div>
          <div className="detail-header">
            <h1 className="detail-title">
              {movie.title}
              <span className="detail-year">({year})</span>
            </h1>
            
            {movie.tagline && (
              <p className="detail-tagline">
                {movie.tagline}
              </p>
            )}
          </div>

          <div className="movie-metrics">
            <div className="metric">
              <div className="metric-label">Note</div>
              <div className="metric-value rating">
                ⭐ {movie.vote_average.toFixed(1)}/10
              </div>
            </div>
            <div className="metric">
              <div className="metric-label">Sortie</div>
              <div className="metric-value">
                {new Date(movie.release_date).toLocaleDateString('fr-FR')}
              </div>
            </div>
            <div className="metric">
              <div className="metric-label">Durée</div>
              <div className="metric-value">{runtime}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Statut</div>
              <div className="metric-value">{movie.status}</div>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h2 style={{ 
              fontSize: 'var(--text-xl)', 
              marginBottom: 'var(--space-3)',
              color: backdropUrl ? 'white' : 'var(--ff-text)'
            }}>
              Synopsis
            </h2>
            <p style={{
              lineHeight: '1.8',
              color: backdropUrl ? 'rgba(255,255,255,0.9)' : 'var(--ff-text-light)',
              fontSize: 'var(--text-base)'
            }}>
              {movie.overview || "Aucun synopsis disponible."}
            </p>
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h2 style={{ 
              fontSize: 'var(--text-xl)', 
              marginBottom: 'var(--space-3)',
              color: backdropUrl ? 'white' : 'var(--ff-text)'
            }}>
              Genres
            </h2>
            <div className="genres-list">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {movie.production_companies.length > 0 && (
            <div style={{ marginBottom: 'var(--space-6)' }}>
              <h2 style={{ 
                fontSize: 'var(--text-xl)', 
                marginBottom: 'var(--space-3)',
                color: backdropUrl ? 'white' : 'var(--ff-text)'
              }}>
                Production
              </h2>
              <div className="companies-list">
                {movie.production_companies.slice(0, 5).map(company => (
                  <div key={company.id} style={{ display: 'flex', alignItems: 'center' }}>
                    {company.logo_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="company-logo"
                      />
                    ) : (
                      <span className="company-name">
                        {company.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <a href="/" className="back-button">
            ← Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}