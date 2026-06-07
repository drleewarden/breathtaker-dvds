'use client';

import { useState } from 'react';
import type { Filters, RatingFilter, Section } from '@/types';

const RATINGS: RatingFilter[] = ['ALL', 'G', 'PG', 'M', 'MA15+'];

const RATING_BADGE: Record<string, string> = {
  ALL:     'border-[#D4C8B8] text-[#7A6040] hover:border-[#BF9840] hover:text-[#BF9840]',
  G:       'border-[#2D6A2D] text-[#2D6A2D] hover:bg-[#2D6A2D] hover:text-white',
  PG:      'border-[#1F5FAB] text-[#1F5FAB] hover:bg-[#1F5FAB] hover:text-white',
  M:       'border-[#B87420] text-[#B87420] hover:bg-[#B87420] hover:text-white',
  'MA15+': 'border-[#A02828] text-[#A02828] hover:bg-[#A02828] hover:text-white',
};

const RATING_ACTIVE: Record<string, string> = {
  ALL:     'border-[#BF9840] bg-[#BF9840] text-white',
  G:       'border-[#2D6A2D] bg-[#2D6A2D] text-white',
  PG:      'border-[#1F5FAB] bg-[#1F5FAB] text-white',
  M:       'border-[#B87420] bg-[#B87420] text-white',
  'MA15+': 'border-[#A02828] bg-[#A02828] text-white',
};

const SECTIONS: { value: Section; label: string }[] = [
  { value: 'movies', label: 'Films' },
  { value: 'kids',   label: 'Kids' },
  { value: 'series', label: 'Series' },
];

interface Props {
  filters: Filters;
  genres: string[];
  totalCount: number;
  filteredCount: number;
  onChange: (f: Partial<Filters>) => void;
}

export default function FilterBar({ filters, genres, totalCount, filteredCount, onChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const hasActiveFilters = filters.search || filters.genre || filters.rating !== 'ALL';

  const filterPanel = (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <label className="block text-[10px] font-semibold text-[#9A8A78] uppercase tracking-brand mb-2">
          Search
        </label>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9A8A78]"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Title..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D4C8B8] text-[#152740] placeholder-[#9A8A78] focus:outline-none focus:border-[#BF9840] transition-colors tracking-wide"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-[10px] font-semibold text-[#9A8A78] uppercase tracking-brand mb-2">
          Rating
        </label>
        <div className="flex flex-wrap gap-1.5">
          {RATINGS.map((r) => (
            <button
              key={r}
              onClick={() => onChange({ rating: r })}
              className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide border transition-all ${
                filters.rating === r ? RATING_ACTIVE[r] : RATING_BADGE[r]
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Genre */}
      <div>
        <label className="block text-[10px] font-semibold text-[#9A8A78] uppercase tracking-brand mb-2">
          Genre
        </label>
        <div className="flex flex-col gap-0.5 max-h-52 overflow-y-auto pr-1">
          <button
            onClick={() => onChange({ genre: '' })}
            className={`text-left px-2 py-1.5 text-[11px] uppercase tracking-wide transition-colors ${
              filters.genre === ''
                ? 'text-[#BF9840] font-semibold'
                : 'text-[#9A8A78] hover:text-[#152740]'
            }`}
          >
            All Genres
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => { onChange({ genre: g }); setMobileOpen(false); }}
              className={`text-left px-2 py-1.5 text-[11px] uppercase tracking-wide transition-colors ${
                filters.genre === g
                  ? 'text-[#BF9840] font-semibold'
                  : 'text-[#9A8A78] hover:text-[#152740]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="text-[10px] text-[#9A8A78] border-t border-[#D4C8B8] pt-4 uppercase tracking-brand">
        Showing <span className="text-[#BF9840] font-semibold">{filteredCount}</span> of{' '}
        <span className="font-semibold text-[#152740]">{totalCount}</span> titles
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP sidebar ── */}
      <aside className="hidden lg:flex flex-col gap-6 w-60 flex-shrink-0">
        {/* Section toggle */}
        <div>
          <label className="block text-[10px] font-semibold text-[#9A8A78] uppercase tracking-brand mb-2">
            Section
          </label>
          <div className="flex border border-[#D4C8B8] overflow-hidden">
            {SECTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onChange({ section: value })}
                className={`flex-1 py-2 text-[10px] font-semibold uppercase tracking-brand transition-colors ${
                  filters.section === value
                    ? value === 'kids'   ? 'bg-[#6680A8] text-white'
                    : value === 'series' ? 'bg-[#7A6040] text-white'
                    : 'bg-[#152740] text-[#BF9840]'
                    : 'bg-white text-[#9A8A78] hover:text-[#152740]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {filterPanel}
      </aside>

      {/* ── MOBILE controls ── */}
      <div className="lg:hidden flex flex-col gap-3">
        {/* Section toggle — always visible */}
        <div className="flex border border-[#D4C8B8] overflow-hidden">
          {SECTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onChange({ section: value })}
              className={`flex-1 py-2.5 text-[11px] font-semibold uppercase tracking-brand transition-colors ${
                filters.section === value
                  ? value === 'kids'   ? 'bg-[#6680A8] text-white'
                  : value === 'series' ? 'bg-[#7A6040] text-white'
                  : 'bg-[#152740] text-[#BF9840]'
                  : 'bg-white text-[#9A8A78]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filters toggle button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center justify-between w-full px-4 py-2.5 bg-white border border-[#D4C8B8] text-[#152740] hover:border-[#BF9840] transition-colors"
        >
          <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-brand">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 4h18M6 12h12M10 20h4" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF9840] inline-block" />
            )}
          </span>
          <svg
            className={`w-4 h-4 text-[#9A8A78] transition-transform duration-200 ${mobileOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Collapsible panel */}
        {mobileOpen && (
          <div className="bg-white border border-[#D4C8B8] p-4">
            {filterPanel}
          </div>
        )}
      </div>
    </>
  );
}
