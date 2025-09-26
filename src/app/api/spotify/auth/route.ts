import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const redirect_uri = 'http://127.0.0.1:3000/api/spotify/callback';
  const scope = 'user-top-read';
  
  if (!client_id) {
    return NextResponse.json({ error: 'Missing Spotify client ID' }, { status: 500 });
  }

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('client_id', client_id);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', redirect_uri);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('show_dialog', 'true');

  return NextResponse.redirect(authUrl.toString());
}