import { NextResponse } from 'next/server';
import { getAccessToken, getTopTrack } from '../../../../lib/spotify';

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