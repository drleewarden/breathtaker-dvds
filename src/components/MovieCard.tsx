'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Movie } from '@/types';

const RATING_STYLES: Record<string, string> = {
  'G':     'bg-green-700 text-green-100',
  'PG':    'bg-blue-700 text-blue-100',
  'M':     'bg-amber-600 text-amber-100',
  'MA15+': 'bg-red-700 text-red-100',
};

interface Props {
  movie: Movie;
}

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
      .then((data) => {
        if (!cancelled) setPosterUrl(data.posterUrl ?? null);
      })
      .catch(() => { if (!cancelled) setError(true); });

    return () => { cancelled = true; };
  }, [movie.title, movie.year]);

  const ratingClass = RATING_STYLES[movie.rating] ?? 'bg-zinc-600 text-zinc-100';

  return (
    <div className="group relative flex flex-col rounded-lg overflow-hidden bg-[#161B22] border border-[#30363D] hover:border-[#D4AF37]/50 transition-all duration-200 hover:shadow-lg hover:shadow-[#D4AF37]/10 hover:-translate-y-0.5">
      {/* Poster area */}
      <div className="relative w-full aspect-[2/3] bg-[#0D1117] flex-shrink-0">
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

        {/* Placeholder shown until poster loads or on error */}
        {(!posterUrl || !loaded || error) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
            <div className="text-4xl opacity-20">🎬</div>
            <p className="text-[10px] text-[#8B949E] font-medium leading-tight line-clamp-3">
              {movie.title}
            </p>
          </div>
        )}

        {/* Rating badge */}
        <span className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${ratingClass}`}>
          {movie.rating}
        </span>

        {/* Kids badge */}
        {movie.isKids && (
          <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-700 text-purple-100">
            KIDS
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1 flex-1">
        <h3 className="text-xs font-semibold text-[#E6EDF3] leading-tight line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
          {movie.title}
        </h3>
        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {movie.genres.slice(0, 2).map((g) => (
            <span key={g} className="text-[9px] px-1.5 py-0.5 rounded bg-[#30363D] text-[#8B949E]">
              {g}
            </span>
          ))}
        </div>
        {movie.year && (
          <p className="text-[9px] text-[#8B949E] mt-0.5">{movie.year}</p>
        )}
      </div>
    </div>
  );
}
