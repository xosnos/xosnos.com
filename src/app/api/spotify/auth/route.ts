import { NextResponse } from 'next/server';
import { SPOTIFY_AUTH_URL, REDIRECT_URI } from '../../../../lib/spotify';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const scope = 'user-top-read';
  
  if (!client_id) {
    return NextResponse.json({ error: 'Missing Spotify client ID' }, { status: 500 });
  }

  const authUrl = new URL(SPOTIFY_AUTH_URL);
  authUrl.searchParams.append('client_id', client_id);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('show_dialog', 'true');

  return NextResponse.redirect(authUrl.toString());
}