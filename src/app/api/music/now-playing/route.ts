import { NextResponse } from 'next/server';
import { getAppleNowPlaying } from '@/lib/apple-music';
import { getAccessToken, getTopTrack } from '@/lib/spotify';

export async function GET() {
  const developerToken = process.env.APPLE_MUSIC_DEVELOPER_TOKEN;
  const userToken = process.env.APPLE_MUSIC_USER_TOKEN;
  const storefront = process.env.APPLE_MUSIC_STOREFRONT || 'us';

  const hasAppleCredentials = Boolean(developerToken && userToken);

  try {
    if (hasAppleCredentials) {
      const appleTrack = await getAppleNowPlaying({
        developerToken: developerToken as string,
        userToken: userToken as string,
        storefront,
      });

      if (appleTrack) {
        return NextResponse.json(appleTrack);
      }
    }

    const hasSpotifyCredentials =
      Boolean(process.env.SPOTIFY_REFRESH_TOKEN) &&
      Boolean(process.env.SPOTIFY_CLIENT_ID) &&
      Boolean(process.env.SPOTIFY_CLIENT_SECRET);

    if (hasSpotifyCredentials) {
      const accessToken = await getAccessToken();
      const topTrack = await getTopTrack(accessToken);

      if (topTrack) {
        return NextResponse.json({
          id: topTrack.id,
          name: topTrack.name,
          artist: topTrack.artists.map((artist) => artist.name).join(', '),
          album: topTrack.album.name,
          artworkUrl: topTrack.album.images[0]?.url || null,
          url: topTrack.external_urls.spotify,
          previewUrl: topTrack.preview_url,
          duration: topTrack.duration_ms,
          provider: 'spotify',
        });
      }
    }

    return NextResponse.json(
      {
        error: 'No music source configured',
        instructions: hasAppleCredentials
          ? 'Apple Music returned no recent tracks. Try playing something and refresh.'
          : 'Set APPLE_MUSIC_DEVELOPER_TOKEN and APPLE_MUSIC_USER_TOKEN to switch to Apple Music.',
      },
      { status: 503 },
    );
  } catch (error) {
    console.error('Music now-playing API error:', error);
    return NextResponse.json(
      {
        error: 'Unable to fetch now-playing',
        details: hasAppleCredentials
          ? 'Apple Music tokens are set, but the request failed. Regenerate the developer/user tokens or retry shortly.'
          : 'Add APPLE_MUSIC_DEVELOPER_TOKEN and APPLE_MUSIC_USER_TOKEN, or keep Spotify credentials for fallback.',
      },
      { status: 500 },
    );
  }
}

