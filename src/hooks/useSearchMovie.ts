import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdbClient";
import type { MovieListResponse, MovieSummary } from "../types/movie";

export function useSearchMovie(query: string) {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const searchTimeout = setTimeout(() => {
      setLoading(true);
      setError(null);

      tmdbGet<MovieListResponse>(`/search/movie?query=${encodeURIComponent(query)}`)
        .then((data) => {
          setMovies(data.results);
        })
        .catch((e) => {
          setError(e.message);
          setMovies([]);
        })
        .finally(() => setLoading(false));
    }, 500);
    return () => clearTimeout(searchTimeout);
  }, [query]);

  return { movies, loading, error };
}