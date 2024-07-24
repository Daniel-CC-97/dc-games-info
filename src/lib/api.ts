const API_BASE_URL = 'https://api.igdb.com/v4';
const IGDB_ACCESS_TOKEN = process.env.NEXT_PUBLIC_IGDB_ACCESS_TOKEN; // Ensure this token is set


// Fetch the current top 10 rated games.
export async function fetchTopGames() {
  const query = `
    fields name, cover;
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

// Fetch the cover art of a game
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

// Fetch all info on 1 game
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

  export async function fetchNewstGames() {
    const query = `
    `
  }

// Fetch the 10 newest games
export async function fetchNewestGames() {
    const query = `
        fields name, cover;
        sort first_release_date desc;
        where first_release_date != null;
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
        throw new Error('Failed to fetch newest games');
    }

    return response.json();
}

// Fetch top Multiplayer games
export async function fetchTopMultiplayerGames() {
    const query = `
      fields name, cover;
      sort total_rating desc;
      where total_rating_count > 500 & game_modes = [2];
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
      throw new Error('Failed to fetch multiplayer games');
    }
  
    return response.json();
  }

// Fetch top coop games
export async function fetchTopCoopGames() {
    // First query: Try to fetch games with more than 500 total ratings
    const queryWithRatingThreshold = `
      fields name, cover;
      sort total_rating desc;
      where total_rating_count > 10 & game_modes = [3];
      limit 10;
    `;
  
    let response = await fetch(`${API_BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${IGDB_ACCESS_TOKEN}`,
        'Client-ID': process.env.NEXT_PUBLIC_IGDB_CLIENT_ID as string,
        'Content-Type': 'application/json'
      },
      body: queryWithRatingThreshold,
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch coop games with rating threshold');
    }
  
    return response.json();
}

