import { useEffect, useState } from "react";
import "./App.css";

import { tmdbGet } from "./services/tmdbClient";
import type { MovieDetails } from "./types/movie";

function App() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(import.meta.env)
  console.log("API Key présente ?", import.meta.env.VITE_TMDB_API_KEY ? "Oui" : "Non");

  useEffect(() => {
    tmdbGet<MovieDetails>("/movie/508?language=en-US")
      .then(setMovie)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!movie) return <p>Erreur lors du chargement</p>;

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div style={{ padding: 20 }}>
      <h1>{movie.title}</h1>

      <img
        src={posterUrl}
        alt={movie.title}
        style={{ width: 250, borderRadius: 8 }}
      />

      <p><strong>⭐ Note :</strong> {movie.vote_average}</p>
      <p><strong>📅 Date :</strong> {movie.release_date}</p>
      <p><strong>⏱ Runtime :</strong> {movie.runtime} min</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default App;
