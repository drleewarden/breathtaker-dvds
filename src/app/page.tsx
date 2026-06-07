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
    section: 'movies',
  });

  const sectionMovies = useMemo(() => {
    if (filters.section === 'kids')   return ALL_MOVIES.filter((m) => m.isKids && !m.isSeries);
    if (filters.section === 'series') return ALL_MOVIES.filter((m) => m.isSeries);
    return ALL_MOVIES.filter((m) => !m.isKids && !m.isSeries);
  }, [filters.section]);

  const genres = useMemo(() => getAllGenres(sectionMovies), [sectionMovies]);

  const filtered = useMemo(() => {
    return sectionMovies.filter((m) => {
      if (filters.rating !== 'ALL' && m.rating !== filters.rating) return false;
      if (filters.genre && !m.genres.includes(filters.genre)) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!m.title.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [sectionMovies, filters]);

  function handleChange(partial: Partial<Filters>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  const sectionHeading =
    filters.section === 'kids'   ? 'Kids Movies' :
    filters.section === 'series' ? 'TV Series'   : 'All Films';

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#EDE8DC' }}>

      {/* Header */}
      <header className="topo-bg border-b border-[#D4C8B8] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h1
              className="text-xl sm:text-2xl font-semibold text-[#152740] tracking-wide-brand uppercase"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              Breathtaker
            </h1>
            <p className="text-[9px] font-medium text-[#7A6040] tracking-brand uppercase mt-0.5">
              Hotel &amp; Spa · DVD Library
            </p>
          </div>
          <p className="hidden sm:block text-[10px] text-[#9A8A78] text-right leading-relaxed uppercase tracking-wide">
            Complimentary for in-house guests
            <br />
            <span className="text-[#BF9840]">Dial reception ext. 1000</span>
          </p>
        </div>
        <div className="bg-[#152740] py-2 px-4 sm:px-6">
          <p className="max-w-7xl mx-auto text-[10px] text-[#BF9840] uppercase tracking-brand text-center sm:text-left">
            Browse our collection · Available from reception
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar */}
          <FilterBar
            filters={filters}
            genres={genres}
            totalCount={sectionMovies.length}
            filteredCount={filtered.length}
            onChange={handleChange}
          />

          {/* Grid area */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#D4C8B8]">
              <div>
                <h2
                  className="text-2xl font-semibold text-[#152740] uppercase tracking-wide-brand"
                  style={{ fontFamily: 'var(--font-cormorant), serif' }}
                >
                  {sectionHeading}
                </h2>
                {filters.genre && (
                  <p className="text-[10px] text-[#BF9840] uppercase tracking-brand mt-1">
                    {filters.genre}
                  </p>
                )}
              </div>
              {(filters.search || filters.genre || filters.rating !== 'ALL') && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, search: '', genre: '', rating: 'ALL' }))}
                  className="text-[10px] text-[#9A8A78] hover:text-[#BF9840] uppercase tracking-brand underline underline-offset-2 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <svg className="w-12 h-12 text-[#D4C8B8] mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h2v2H6V8zm0 4h2v2H6v-2zm4-4h6v2h-6V8zm0 4h6v2h-6v-2z"/>
                </svg>
                <p className="text-[#9A8A78] text-sm uppercase tracking-brand">No titles match your filters</p>
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, search: '', genre: '', rating: 'ALL' }))}
                  className="mt-3 text-[10px] text-[#BF9840] uppercase tracking-brand hover:underline"
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

      {/* Footer */}
      <footer className="bg-[#152740] mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p
            className="text-lg font-medium text-[#BF9840] tracking-wide-brand uppercase mb-1"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Breathtaker Hotel &amp; Spa
          </p>
          <p className="text-[10px] text-[#6680A8] uppercase tracking-brand">
            Mount Buller · DVD Library · For in-house guests only
          </p>
          <p className="text-[9px] text-[#4A5568] mt-4 uppercase tracking-brand">
            Created by{' '}
            <a href="https://creative-milk.com.au" target="_blank" rel="noopener noreferrer"
              className="hover:text-[#BF9840] transition-colors">
              creative-milk.com.au
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
