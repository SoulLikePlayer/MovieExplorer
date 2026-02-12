import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdbClient";
import { MovieDetails } from "../types/movie";

export function useMovieDetails(id: number) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    tmdbGet<MovieDetails>(`/movie/${id}`)
      .then(setMovie)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading, error };
}
