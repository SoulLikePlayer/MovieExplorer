import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdbClient";
import type { MovieListResponse, MovieSummary } from "../types/movie";

interface Filters {
  genre?: number;
  language?: string;
  year?: number;
  sortBy?: string;
}

export function useSearchMovieWithFilters(query: string, filters: Filters = {}) {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query.trim() && !filters.genre && !filters.language && !filters.year) {
      setMovies([]);
      setTotalResults(0);
      setTotalPages(0);
      return;
    }

    const searchTimeout = setTimeout(() => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('include_adult', 'false');
      
      let endpoint = '';

      if (query.trim()) {
        endpoint = '/search/movie';
        params.append('query', query);
        
        if (filters.year) {
          params.append('primary_release_year', filters.year.toString());
        }
        
        if (filters.language) {
          params.append('language', filters.language);
        }
        
        params.append('sort_by', 'popularity.desc');
      } 
      else {
        endpoint = '/discover/movie';
        
        if (filters.language) {
          params.append('with_original_language', filters.language);
        }
        
        if (filters.genre) {
          params.append('with_genres', filters.genre.toString());
        }
        
        if (filters.year) {
          params.append('primary_release_year', filters.year.toString());
        }
        
        if (filters.sortBy) {
          params.append('sort_by', filters.sortBy);
        } else {
          params.append('sort_by', 'popularity.desc');
        }
      }

      const url = `${endpoint}?${params.toString()}`;
      console.log('TMDB Request:', url); 
      
      tmdbGet<MovieListResponse>(url)
        .then((data) => {
          setMovies(data.results);
          setTotalResults(data.total_results);
          setTotalPages(data.total_pages);
        })
        .catch((e) => {
          setError(e.message);
          setMovies([]);
        })
        .finally(() => setLoading(false));
    }, query.trim() ? 500 : 0);

    return () => clearTimeout(searchTimeout);
  }, [query, filters.genre, filters.language, filters.year, filters.sortBy, currentPage]);

  return { 
    movies, 
    loading, 
    error, 
    totalResults, 
    totalPages, 
    currentPage, 
    setCurrentPage 
  };
}