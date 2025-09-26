import { NextRequest, NextResponse } from 'next/server';

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json(
      { error: `Spotify authorization error: ${error}` },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' },
      { status: 400 }
    );
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirect_uri = `http://127.0.0.1:3000/api/spotify/callback`;

  if (!client_id || !client_secret) {
    return NextResponse.json(
      { error: 'Missing Spotify credentials' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify token exchange error:', errorData);
      return NextResponse.json(
        { error: 'Failed to exchange code for tokens' },
        { status: 500 }
      );
    }

    const tokenData = await response.json();
    
    // Return tokens for manual copying to .env.local
    return NextResponse.json({
      message: 'Authorization successful! Copy the refresh_token to your .env.local file',
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in,
      token_type: tokenData.token_type,
      scope: tokenData.scope,
    });

  } catch (error) {
    console.error('Spotify callback error:', error);
    return NextResponse.json(
      { error: 'Internal server error during token exchange' },
      { status: 500 }
    );
  }
}