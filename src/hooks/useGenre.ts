import { useEffect, useState } from "react";
import { tmdbGet } from "../services/tmdbClient";
import type { Genre } from "../types/movie";

interface GenreResponse {
  genres: Genre[];
}

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    tmdbGet<GenreResponse>('/genre/movie/list')
      .then((data) => setGenres(data.genres))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { genres, loading, error };
}