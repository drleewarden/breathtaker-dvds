'use client';

import { useMemo, useState } from 'react';
import moviesData from '@/data/movies.json';
import FilterBar from '@/components/FilterBar';
import MovieCard from '@/components/MovieCard';
import type { Filters, Movie } from '@/types';

const ALL_MOVIES = moviesData as Movie[];

function getAllGenres(movies: Movie[]): string[] {
  const set = new Set<string>();
  movies.forEach((m) => m.genres.forEach((g) => set.add(g)));
  return Array.from(set).sort();
}

export default function Home() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    genre: '',
    rating: 'ALL',
    kidsOnly: false,
  });

  const genres = useMemo(() => getAllGenres(ALL_MOVIES), []);

  const filtered = useMemo(() => {
    return ALL_MOVIES.filter((m) => {
      if (filters.kidsOnly && !m.isKids) return false;
      if (!filters.kidsOnly && m.isKids) return false;
      if (filters.rating !== 'ALL' && m.rating !== filters.rating) return false;
      if (filters.genre && !m.genres.includes(filters.genre)) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!m.title.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  function handleChange(partial: Partial<Filters>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  const sectionLabel = filters.kidsOnly ? 'Kids Movies' : 'All Films';

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Header */}
      <header className="border-b border-[#30363D] bg-[#0D1117]/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#E6EDF3] tracking-tight">
              Breathtaker Hotel Spa
            </h1>
            <p className="text-xs text-[#D4AF37] tracking-widest uppercase font-medium mt-0.5">
              DVD Library
            </p>
          </div>
          <p className="hidden sm:block text-xs text-[#8B949E] text-right max-w-[200px] leading-relaxed">
            Complimentary for in-house guests.
            <br />
            Dial reception ext. 1000.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterBar
            filters={filters}
            genres={genres}
            totalCount={ALL_MOVIES.filter((m) =>
              filters.kidsOnly ? m.isKids : !m.isKids
            ).length}
            filteredCount={filtered.length}
            onChange={handleChange}
          />

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#E6EDF3]">
                {sectionLabel}
                {filters.genre && (
                  <span className="ml-2 text-[#D4AF37]">· {filters.genre}</span>
                )}
              </h2>
              {(filters.search || filters.genre || filters.rating !== 'ALL') && (
                <button
                  onClick={() => setFilters({ search: '', genre: '', rating: 'ALL', kidsOnly: filters.kidsOnly })}
                  className="text-xs text-[#8B949E] hover:text-[#D4AF37] transition-colors underline underline-offset-2"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-5xl mb-4 opacity-30">🎬</div>
                <p className="text-[#8B949E] text-sm">No movies match your filters.</p>
                <button
                  onClick={() => setFilters({ search: '', genre: '', rating: 'ALL', kidsOnly: filters.kidsOnly })}
                  className="mt-3 text-xs text-[#D4AF37] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
                {filtered.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#30363D] mt-12 py-6 text-center text-[10px] text-[#8B949E]">
        Breathtaker Hotel Spa — DVD Library · For in-house guests only
      </footer>
    </div>
  );
}
