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
    const query = `
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
      body: query,
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch coop games with rating threshold');
    }
  
    return response.json();
}


export async function fetchThemes(themeArray: number[]) {
  // Ensure themeArray is formatted as a comma-separated list
  const themeIds = themeArray.join(',');
  
  // Construct the query string
  const query = `
    fields name;
    where id = (${themeIds});
  `;

  try {
    const response = await fetch(`${API_BASE_URL}/themes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${IGDB_ACCESS_TOKEN}`,
        'Client-ID': process.env.NEXT_PUBLIC_IGDB_CLIENT_ID as string,
        'Content-Type': 'text/plain', // Use 'text/plain' if the API expects plain text
      },
      body: query,
    });

    if (!response.ok) {
      const errorText = await response.text(); // Capture error response text
      throw new Error(`Failed to fetch themes: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching themes:', error);
    throw error;
  }
}

export async function fetchPlatforms(platformArray: number[]) {
    const platformIds = platformArray.join(',');
    const query = `
    fields name;
    where id = (${platformIds});
    `;

    try {
        const response = await fetch(`${API_BASE_URL}/platforms`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${IGDB_ACCESS_TOKEN}`,
                'Client-ID': process.env.NEXT_PUBLIC_IGDB_CLIENT_ID as string,
                'Content-Type': 'text/plain'
            },
            body: query
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch platforms: ${response.status} ${response.statusText} - ${errorText}`)
        }

        return response.json();

    } catch (error) {
        console.error('Error fetching platforms: ', error)
        throw error;
    }
}

