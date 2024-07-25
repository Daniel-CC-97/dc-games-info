// app/api/themes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchThemes } from '@/lib/api';

export async function GET(req: NextRequest) {
    try {
        const themes = await fetchThemes();
        return NextResponse.json(themes);
    } catch (error) {
        console.error('Error fetching themes:', error);
        return NextResponse.json({ error: 'Error fetching themes' }, { status: 500 });
    }
}
