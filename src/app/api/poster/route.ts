import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get('title');
  const year = request.nextUrl.searchParams.get('year');

  if (!title) {
    return NextResponse.json({ posterUrl: null });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ posterUrl: null });
  }

  try {
    const query = encodeURIComponent(title);
    const yearParam = year ? `&year=${year}` : '';
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}${yearParam}&api_key=${apiKey}&language=en-US&page=1`;

    const res = await fetch(url, {
      next: { revalidate: 604800 }, // Cache for 7 days
    });

    if (!res.ok) {
      return NextResponse.json({ posterUrl: null });
    }

    const data = await res.json();
    const movie = data.results?.[0];
    const posterUrl = movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : null;

    return NextResponse.json(
      { posterUrl },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=86400',
        },
      }
    );
  } catch {
    return NextResponse.json({ posterUrl: null });
  }
}
