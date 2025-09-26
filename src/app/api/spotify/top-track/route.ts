import { NextResponse } from 'next/server';

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
  duration_ms: number;
}

interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
}

async function getAccessToken(): Promise<string> {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refresh_token || !client_id || !client_secret) {
    throw new Error('Missing Spotify credentials in environment variables');
  }

  const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    console.error('Spotify token refresh error:', errorData);
    throw new Error(`Failed to refresh Spotify access token: ${errorData.error_description || errorData.error || response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function getTopTrack(accessToken: string): Promise<SpotifyTrack | null> {
  const response = await fetch(`${SPOTIFY_TOP_TRACKS_ENDPOINT}?limit=1&time_range=short_term`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top tracks from Spotify');
  }

  const data: SpotifyTopTracksResponse = await response.json();
  return data.items[0] || null;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    const topTrack = await getTopTrack(accessToken);

    if (!topTrack) {
      return NextResponse.json(
        { error: 'No top track found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: topTrack.id,
      name: topTrack.name,
      artists: topTrack.artists.map(artist => artist.name).join(', '),
      album: topTrack.album.name,
      image: topTrack.album.images[0]?.url || null,
      spotifyUrl: topTrack.external_urls.spotify,
      previewUrl: topTrack.preview_url,
      duration: topTrack.duration_ms,
    });
  } catch (error) {
    console.error('Spotify API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top track' },
      { status: 500 }
    );
  }
}