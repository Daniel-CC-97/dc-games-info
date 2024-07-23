const API_BASE_URL = 'https://api.igdb.com/v4';
const IGDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_IGDB_ACCESS_TOKEN; // Ensure this token is set

export async function fetchTopGames() {
  const query = `
    fields name, total_rating, total_rating_count, cover, rating, artworks;
    sort total_rating desc;
    where total_rating_count > 500;
    limit 10;
  `;

  const response = await fetch(`${API_BASE_URL}/games`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${IGDB_ACCESS_TOKEN}`,
      'Client-ID': process.env.NEXT_PUBLIC_IGDB_CLIENT_ID as string,
      'Content-Type': 'application/json'
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  return response.json();
}

export async function fetchCover(coverId: number) {
  const query = `
    fields url, height, width, image_id;
    where id = ${coverId};
  `;

  const response = await fetch(`${API_BASE_URL}/covers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${IGDB_ACCESS_TOKEN}`,
      'Client-ID': process.env.NEXT_PUBLIC_IGDB_CLIENT_ID as string,
      'Content-Type': 'application/json'
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cover');
  }

  return response.json();
}

export async function fetchGameById(id: string) {
    const query = `
      fields *;
      where id = ${id};
    `;
  
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${IGDB_ACCESS_TOKEN}`,
        'Client-ID': process.env.NEXT_PUBLIC_IGDB_CLIENT_ID as string,
        'Content-Type': 'application/json'
      },
      body: query,
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch game details');
    }
  
    const games = await response.json();
    return games.length > 0 ? games[0] : null;
  }

