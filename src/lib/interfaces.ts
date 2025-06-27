type MovieCardProps = {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
  Genre?: string;
};

interface MovieDetailProps {
  imdbID: string;
  Title: string;
  Year: string;
  Genre: string;
  Poster: string;
  Director: string;
  Actors: string;
  Plot: string;
}

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export type { MovieCardProps, MovieDetailProps, FetchState };
