// app/api/platforms/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchPlatforms } from '@/lib/api';

export async function GET(req: NextRequest) {
    try {
        const platforms = await fetchPlatforms();
        return NextResponse.json(platforms);
    } catch (error) {
        console.error('Error fetching platforms:', error);
        return NextResponse.json({ error: 'Error fetching platforms' }, { status: 500 });
    }
}

