// app/api/genres/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchGenres } from '@/lib/api';

export async function GET(req: NextRequest) {
    try {
        const genres = await fetchGenres();
        return NextResponse.json(genres);
    } catch (error) {
        console.error('Error fetching genres:', error);
        return NextResponse.json({ error: 'Error fetching genres' }, { status: 500 });
    }
}
