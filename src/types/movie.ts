export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: unknown | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieSummary {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface MovieListResponse {
  page: number;
  results: MovieSummary[];
  total_pages: number;
  total_results: number;
}

export interface MovieFilters {
  sortBy?: string;
  query?: string;
  withGenres?: string;
  voteAverageGte?: number;
  voteAverageLte?: number;
  voteCountGte?: number;
  primaryReleaseYear?: number;
  primaryReleaseDateGte?: string;
  primaryReleaseDateLte?: string;
  withRuntimeGte?: number;
  withRuntimeLte?: number;
  withOriginalLanguage?: string;
  certification?: string;
  certificationCountry?: string;
  withCompanies?: string;
  withKeywords?: string;
  withWatchProviders?: string;
  watchRegion?: string;
  withWatchMonetizationTypes?: string;
  includeAdult?: boolean;
  page?: number;
}