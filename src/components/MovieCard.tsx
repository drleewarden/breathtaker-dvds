'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Movie } from '@/types';

const RATING_STYLES: Record<string, string> = {
  'G':     'bg-[#2D6A2D] text-white',
  'PG':    'bg-[#1F5FAB] text-white',
  'M':     'bg-[#B87420] text-white',
  'MA15+': 'bg-[#A02828] text-white',
};

interface Props { movie: Movie }

export default function MovieCard({ movie }: Props) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({ title: movie.title });
    if (movie.year) params.set('year', String(movie.year));

    fetch(`/api/poster?${params}`)
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setPosterUrl(data.posterUrl ?? null); })
      .catch(() => { if (!cancelled) setError(true); });

    return () => { cancelled = true; };
  }, [movie.title, movie.year]);

  const ratingClass = RATING_STYLES[movie.rating] ?? 'bg-[#6680A8] text-white';

  return (
    <div className="group relative flex flex-col bg-white border border-[#D4C8B8] hover:border-[#BF9840] hover:shadow-lg hover:shadow-[#BF9840]/15 hover:-translate-y-0.5 transition-all duration-200 rounded-sm overflow-hidden">
      {/* Poster */}
      <div className="relative w-full aspect-[2/3] bg-[#EDE8DC] flex-shrink-0 overflow-hidden">
        {posterUrl && !error ? (
          <Image
            src={posterUrl}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
            className={`object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        ) : null}

        {/* Placeholder */}
        {(!posterUrl || !loaded || error) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
            <svg className="w-8 h-8 text-[#D4C8B8]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2v12h16V6H4zm2 2h2v2H6V8zm0 4h2v2H6v-2zm4-4h6v2h-6V8zm0 4h6v2h-6v-2z"/>
            </svg>
            <p className="text-[9px] text-[#9A8A78] font-medium leading-tight line-clamp-3 tracking-wide uppercase">
              {movie.title}
            </p>
          </div>
        )}

        {/* Rating badge */}
        <span className={`absolute top-2 left-2 text-[9px] font-bold px-1.5 py-0.5 tracking-wide uppercase ${ratingClass}`}>
          {movie.rating}
        </span>

        {/* Kids badge */}
        {movie.isKids && (
          <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 bg-[#6680A8] text-white uppercase tracking-wide">
            Kids
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1.5 flex-1 bg-white">
        <h3 className="text-[11px] font-semibold text-[#152740] leading-tight line-clamp-2 group-hover:text-[#BF9840] transition-colors tracking-wide uppercase">
          {movie.title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {movie.genres.slice(0, 2).map((g) => (
            <span key={g} className="text-[8px] px-1.5 py-0.5 border border-[#D4C8B8] text-[#9A8A78] uppercase tracking-wide">
              {g}
            </span>
          ))}
        </div>
        {movie.year && (
          <p className="text-[9px] text-[#9A8A78] mt-auto">{movie.year}</p>
        )}
      </div>
    </div>
  );
}
