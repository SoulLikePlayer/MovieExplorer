import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdbClient";
import type { MovieListResponse, MovieSummary, MovieFilters } from "../types/movie";

const cleanFilters = (filters: MovieFilters): Record<string, string> => {
  const params: Record<string, string> = {};
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (typeof value === 'boolean') {
      params[key] = String(value);
    } else {
      params[key] = String(value);
    }
  });
  
  if (!params.sort_by && !params.sortBy) params.sort_by = 'popularity.desc';
  if (!params.include_adult) params.include_adult = 'false';
  if (!params.page) params.page = '1';
  
  return params;
};

export function useDiscoverMovies(initialFilters: MovieFilters = {}) {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<MovieFilters>(initialFilters);

  useEffect(() => {
    let endpoint = '';
    const hasTextQuery = filters.query && filters.query.trim().length > 0;
    
    if (hasTextQuery) {
      endpoint = '/search/movie';
    } else {
      endpoint = '/discover/movie';
    }

    const params = cleanFilters({ ...filters, page: currentPage });
    
    if (hasTextQuery) {
      if (!params.query) return;
      
      if (params.primaryReleaseYear) {
        params.primary_release_year = params.primaryReleaseYear;
        delete params.primaryReleaseYear;
      }
      
      delete params.sort_by;
      delete params.sortBy;
      delete params.with_genres;
      delete params.withGenres;
    } else {
      if (params.sortBy) {
        params.sort_by = params.sortBy;
        delete params.sortBy;
      }
      if (params.withGenres) {
        params.with_genres = params.withGenres;
        delete params.withGenres;
      }
      if (params.primaryReleaseYear) {
        params.primary_release_year = params.primaryReleaseYear;
        delete params.primaryReleaseYear;
      }
      if (params.voteAverageGte) {
        params['vote_average.gte'] = params.voteAverageGte;
        delete params.voteAverageGte;
      }
      if (params.voteAverageLte) {
        params['vote_average.lte'] = params.voteAverageLte;
        delete params.voteAverageLte;
      }
      if (params.voteCountGte) {
        params['vote_count.gte'] = params.voteCountGte;
        delete params.voteCountGte;
      }
      if (params.withRuntimeGte) {
        params['with_runtime.gte'] = params.withRuntimeGte;
        delete params.withRuntimeGte;
      }
      if (params.withRuntimeLte) {
        params['with_runtime.lte'] = params.withRuntimeLte;
        delete params.withRuntimeLte;
      }
      if (params.primaryReleaseDateGte) {
        params['primary_release_date.gte'] = params.primaryReleaseDateGte;
        delete params.primaryReleaseDateGte;
      }
      if (params.primaryReleaseDateLte) {
        params['primary_release_date.lte'] = params.primaryReleaseDateLte;
        delete params.primaryReleaseDateLte;
      }
      if (params.withOriginalLanguage) {
        params.with_original_language = params.withOriginalLanguage;
        delete params.withOriginalLanguage;
      }
      if (params.withCompanies) {
        params.with_companies = params.withCompanies;
        delete params.withCompanies;
      }
      if (params.withKeywords) {
        params.with_keywords = params.withKeywords;
        delete params.withKeywords;
      }
      if (params.withWatchProviders) {
        params.with_watch_providers = params.withWatchProviders;
        delete params.withWatchProviders;
      }
      if (params.watchRegion) {
        params.watch_region = params.watchRegion;
        delete params.watchRegion;
      }
      if (params.withWatchMonetizationTypes) {
        params.with_watch_monetization_types = params.withWatchMonetizationTypes;
        delete params.withWatchMonetizationTypes;
      }
      if (params.certification) {
        params.certification = params.certification;
        delete params.certification;
      }
      if (params.certificationCountry) {
        params.certification_country = params.certificationCountry;
        delete params.certificationCountry;
      }
    }

    delete params.includeAdult;

    const url = `${endpoint}?${new URLSearchParams(params).toString()}`;
    
    const fetchTimeout = setTimeout(() => {
      setLoading(true);
      tmdbGet<MovieListResponse>(url)
        .then((data) => {
          setMovies(data.results);
          setTotalResults(data.total_results);
          setTotalPages(data.total_pages);
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }, hasTextQuery ? 500 : 0);

    return () => clearTimeout(fetchTimeout);
  }, [filters, currentPage]);

  return {
    movies,
    loading,
    error,
    totalResults,
    totalPages,
    currentPage,
    setCurrentPage,
    setFilters,
    filters
  };
}