'use client';

import type { Filters, RatingFilter } from '@/types';

const RATINGS: RatingFilter[] = ['ALL', 'G', 'PG', 'M', 'MA15+'];

const RATING_STYLES: Record<string, string> = {
  ALL:     'bg-[#30363D] text-[#E6EDF3] hover:bg-[#444C56]',
  G:       'bg-green-800 text-green-100 hover:bg-green-700',
  PG:      'bg-blue-800 text-blue-100 hover:bg-blue-700',
  M:       'bg-amber-800 text-amber-100 hover:bg-amber-700',
  'MA15+': 'bg-red-800 text-red-100 hover:bg-red-700',
};

const ACTIVE_STYLES: Record<string, string> = {
  ALL:     'ring-2 ring-[#D4AF37]',
  G:       'ring-2 ring-green-400',
  PG:      'ring-2 ring-blue-400',
  M:       'ring-2 ring-amber-400',
  'MA15+': 'ring-2 ring-red-400',
};

interface Props {
  filters: Filters;
  genres: string[];
  totalCount: number;
  filteredCount: number;
  onChange: (f: Partial<Filters>) => void;
}

export default function FilterBar({ filters, genres, totalCount, filteredCount, onChange }: Props) {
  return (
    <aside className="flex flex-col gap-5 w-full lg:w-64 flex-shrink-0">
      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-2">
          Search
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B949E]"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Title..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-sm bg-[#161B22] border border-[#30363D] rounded-lg text-[#E6EDF3] placeholder-[#8B949E] focus:outline-none focus:border-[#D4AF37] transition-colors"
          />
        </div>
      </div>

      {/* Section toggle */}
      <div>
        <label className="block text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-2">
          Section
        </label>
        <div className="flex rounded-lg overflow-hidden border border-[#30363D]">
          <button
            onClick={() => onChange({ kidsOnly: false })}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${
              !filters.kidsOnly
                ? 'bg-[#D4AF37] text-[#0D1117]'
                : 'bg-[#161B22] text-[#8B949E] hover:text-[#E6EDF3]'
            }`}
          >
            All Films
          </button>
          <button
            onClick={() => onChange({ kidsOnly: true })}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${
              filters.kidsOnly
                ? 'bg-purple-600 text-white'
                : 'bg-[#161B22] text-[#8B949E] hover:text-[#E6EDF3]'
            }`}
          >
            Kids
          </button>
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-2">
          Rating
        </label>
        <div className="flex flex-wrap gap-2">
          {RATINGS.map((r) => (
            <button
              key={r}
              onClick={() => onChange({ rating: r })}
              className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${RATING_STYLES[r]} ${
                filters.rating === r ? ACTIVE_STYLES[r] : 'opacity-60'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div>
        <label className="block text-xs font-semibold text-[#8B949E] uppercase tracking-wider mb-2">
          Genre
        </label>
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1">
          <button
            onClick={() => onChange({ genre: '' })}
            className={`text-left px-2.5 py-1.5 text-xs rounded transition-colors ${
              filters.genre === ''
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-semibold'
                : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#30363D]'
            }`}
          >
            All Genres
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => onChange({ genre: g })}
              className={`text-left px-2.5 py-1.5 text-xs rounded transition-colors ${
                filters.genre === g
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-semibold'
                  : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#30363D]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="text-xs text-[#8B949E] border-t border-[#30363D] pt-4">
        Showing <span className="text-[#D4AF37] font-semibold">{filteredCount}</span> of{' '}
        <span className="font-semibold">{totalCount}</span> titles
      </div>
    </aside>
  );
}
