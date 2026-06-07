export interface Movie {
  id: string;
  title: string;
  rating: string;
  genres: string[];
  isKids: boolean;
  year?: number;
}

export type RatingFilter = 'ALL' | 'G' | 'PG' | 'M' | 'MA15+';

export interface Filters {
  search: string;
  genre: string;
  rating: RatingFilter;
  kidsOnly: boolean;
}
