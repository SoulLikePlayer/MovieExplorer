import { useState } from 'react';
import { useGenres } from '../hooks/useGenre';
import type { MovieFilters } from '../types/movie';

interface MovieFiltersProps {
  onFilterChange: (filters: MovieFilters) => void;
  activeFilters: MovieFilters;
}

const LANGUAGES = [
  { code: 'en', name: 'Anglais' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Espagnol' },
  { code: 'de', name: 'Allemand' },
  { code: 'it', name: 'Italien' },
  { code: 'ja', name: 'Japonais' },
  { code: 'ko', name: 'Coréen' },
  { code: 'zh', name: 'Chinois' },
  { code: 'hi', name: 'Hindi' },
];

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Popularité (décroissante)' },
  { value: 'popularity.asc', label: 'Popularité (croissante)' },
  { value: 'vote_average.desc', label: 'Note (décroissante)' },
  { value: 'vote_average.asc', label: 'Note (croissante)' },
  { value: 'primary_release_date.desc', label: 'Date de sortie (récent)' },
  { value: 'primary_release_date.asc', label: 'Date de sortie (ancien)' },
  { value: 'title.asc', label: 'Titre (A-Z)' },
  { value: 'title.desc', label: 'Titre (Z-A)' },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => CURRENT_YEAR - i);

const RUNTIME_OPTIONS = [
  { value: 0, label: 'Toutes durées' },
  { value: 60, label: 'Moins de 1h' },
  { value: 90, label: 'Moins de 1h30' },
  { value: 120, label: 'Moins de 2h' },
  { value: 150, label: 'Moins de 2h30' },
  { value: 180, label: 'Moins de 3h' },
];

const VOTE_OPTIONS = [
  { value: 0, label: 'Toutes notes' },
  { value: 5, label: '≥ 5/10' },
  { value: 6, label: '≥ 6/10' },
  { value: 7, label: '≥ 7/10' },
  { value: 8, label: '≥ 8/10' },
];

export default function MovieFilters({ onFilterChange, activeFilters }: MovieFiltersProps) {
  const { genres } = useGenres();
  const [isOpen, setIsOpen] = useState(true);

  const handleFilterChange = (key: keyof MovieFilters, value: any) => {
    onFilterChange({ ...activeFilters, [key]: value || undefined });
  };

  const handleReset = () => {
    onFilterChange({
      sortBy: 'popularity.desc',
      includeAdult: false,
    });
  };

  return (
    <div className="filters-panel">
      <button 
        className="filters-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Filtres avancés</span>
        <span style={{ fontSize: 'var(--text-lg)' }}>{isOpen ? '▼' : '▶'}</span>
      </button>

      {isOpen && (
        <div className="filters-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div className="filter-group">
              <label className="filter-label">Trier par</label>
              <select 
                className="filter-select"
                value={activeFilters.sortBy || 'popularity.desc'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Genres (Ctrl+clic)</label>
              <select 
                className="filter-select"
                multiple
                size={5}
                value={activeFilters.withGenres?.split(',') || []}
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                  handleFilterChange('withGenres', selected.join(',') || undefined);
                }}
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Langue d'origine</label>
              <select 
                className="filter-select"
                value={activeFilters.withOriginalLanguage || ''}
                onChange={(e) => handleFilterChange('withOriginalLanguage', e.target.value || undefined)}
              >
                <option value="">Toutes les langues</option>
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div className="filter-group">
              <label className="filter-label">Note minimum</label>
              <select 
                className="filter-select"
                value={activeFilters.voteAverageGte || 0}
                onChange={(e) => handleFilterChange('voteAverageGte', Number(e.target.value) || undefined)}
              >
                {VOTE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Durée maximum</label>
              <select 
                className="filter-select"
                value={activeFilters.withRuntimeLte || 0}
                onChange={(e) => handleFilterChange('withRuntimeLte', Number(e.target.value) || undefined)}
              >
                {RUNTIME_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Année de sortie</label>
              <select 
                className="filter-select"
                value={activeFilters.primaryReleaseYear || ''}
                onChange={(e) => handleFilterChange('primaryReleaseYear', Number(e.target.value) || undefined)}
              >
                <option value="">Toutes les années</option>
                {YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div className="filter-group">
              <label className="filter-label">Contenu adulte</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    checked={activeFilters.includeAdult === false}
                    onChange={() => handleFilterChange('includeAdult', false)}
                  />
                  Exclure
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    checked={activeFilters.includeAdult === true}
                    onChange={() => handleFilterChange('includeAdult', true)}
                  />
                  Inclure
                </label>
              </div>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={handleReset}
              style={{ marginTop: 'auto' }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        </div>
      )}
    </div>
  );
}