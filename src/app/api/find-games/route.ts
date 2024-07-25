// app/api/find-games/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchGamesByFilters } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const { genres, themes, platforms } = await req.json();

    const games = await fetchGamesByFilters(genres || [], themes || [], platforms || []);
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json({ error: 'Error fetching games' }, { status: 500 });
  }
}
