export interface Movie {
  id: string;
  title: string;
  rating: string;
  genres: string[];
  isKids: boolean;
  isSeries?: boolean;
  seasons?: string;   // e.g. "Seasons 2, 3, 4, 5, 6" or "Vol 1–3"
  year?: number;
}

export type RatingFilter = 'ALL' | 'G' | 'PG' | 'M' | 'MA15+';
export type Section = 'movies' | 'kids' | 'series';

export interface Filters {
  search: string;
  genre: string;
  rating: RatingFilter;
  section: Section;
}
