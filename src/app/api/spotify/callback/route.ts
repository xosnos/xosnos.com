import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '../../../../lib/spotify';

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

  try {
    const tokenData = await exchangeCodeForTokens(code);
    
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