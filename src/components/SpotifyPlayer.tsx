'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Music, Pause, Play, Volume2 } from 'lucide-react';
import Image from 'next/image';

type Provider = 'apple' | 'spotify';

interface NowPlayingTrack {
  id: string;
  name: string;
  artist: string;
  album?: string;
  artworkUrl?: string | null;
  url?: string | null;
  previewUrl?: string | null;
  duration?: number | null;
  provider: Provider;
}

export default function SpotifyPlayer() {
  const [track, setTrack] = useState<NowPlayingTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [track]);

  const fetchNowPlaying = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/music/now-playing');

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || 'Failed to fetch now playing');
      }

      const data = await response.json();
      setTrack(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load track');
      setTrack(null);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !track?.previewUrl) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Playback error:', err);
    }
  };

  const providerLabel =
    track?.provider === 'apple'
      ? 'Now Playing from Apple Music'
      : track?.provider === 'spotify'
        ? 'Top Track from Spotify'
        : 'Now Playing';

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-secondary">Loading now playing...</span>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="flex items-center space-x-3 text-red-500">
          <Music className="h-6 w-6" />
          <span>{error || 'Nothing is playing right now.'}</span>
        </div>
        <button
          onClick={fetchNowPlaying}
          className="mt-3 text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Volume2 className="h-5 w-5 text-green-500" />
        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          {providerLabel}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {track.artworkUrl && (
          <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={track.artworkUrl}
              alt={`${track.album || track.name} cover`}
              fill
              sizes="64px"
              className="object-cover"
              priority={false}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{track.name}</h3>
          <p className="text-sm text-gray-600 truncate">{track.artist}</p>
          {track.album && <p className="text-xs text-gray-500 truncate">{track.album}</p>}
        </div>

        <div className="flex items-center space-x-2">
          {track.previewUrl && (
            <button
              onClick={togglePlayback}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play preview'}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
          )}

          {track.url && (
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition-colors"
              aria-label="Open in music app"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {track.previewUrl && (
        <>
          <div className="mt-4 bg-gray-200 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <audio ref={audioRef} src={track.previewUrl} preload="metadata" />

          {!track.previewUrl && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Preview not available for this track
            </p>
          )}
        </>
      )}
    </div>
  );
}