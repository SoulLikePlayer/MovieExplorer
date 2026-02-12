const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

async function tmdbRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.append('language', 'fr-FR');

  const headers: HeadersInit = {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export const tmdbPut = <T>(path: string, body?: unknown) =>
  tmdbRequest<T>(path, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

export const tmdbDelete = <T>(path: string) =>
  tmdbRequest<T>(path, { method: "DELETE" });