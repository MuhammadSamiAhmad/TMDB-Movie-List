export type Movie = {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TrendingMovies = {
  id: number;
  count: number;
  poster_url: string;
  searchTerm: string;
  title: string;
};
