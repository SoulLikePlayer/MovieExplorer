const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

/**
 * Fonction générique universelle pour faire n’importe quelle requête HTTP.
 * 
 * @param path endpoint après /3 (ex: /movie/popular)
 * @param options options fetch (method, body, headers...)
 */
async function tmdbRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);

  const headers: HeadersInit = {
    accept: 'application/json',
    Authorization : `Bearer ${API_KEY}`,
    ...options.headers,
  };

  
  const response = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`TMDB error ${response.status}`);
  }

  return response.json();
}


export const tmdbGet = <T>(path: string) =>
  tmdbRequest<T>(path, { method: "GET" });

export const tmdbPost = <T>(path: string, body?: unknown) =>
  tmdbRequest<T>(path, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const tmdbPut = <T>(path: string, body?: unknown) =>
  tmdbRequest<T>(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const tmdbDelete = <T>(path: string) =>
  tmdbRequest<T>(path, { method: "DELETE" });
