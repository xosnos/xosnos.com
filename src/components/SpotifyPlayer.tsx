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
      ? 'Apple Music'
      : track?.provider === 'spotify'
        ? 'Spotify'
        : 'Now Playing';

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 max-w-sm w-full mx-auto animate-pulse">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-white/20 rounded-md"></div>
          <div className="flex-1 space-y-2">
             <div className="h-3 bg-white/20 rounded w-3/4"></div>
             <div className="h-2 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 max-w-sm w-full mx-auto text-white">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-full">
            <Music className="h-5 w-5" />
          </div>
          <div>
              <p className="text-sm font-medium">Not playing anything</p>
              <button
                onClick={fetchNowPlaying}
                className="text-xs text-white/70 hover:text-white underline mt-1"
            >
                Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 max-w-sm w-full mx-auto transition-all hover:bg-white/20 shadow-xl">
      <div className="flex items-center space-x-3">
        {/* Artwork */}
        <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-md shadow-md group">
          {track.artworkUrl ? (
             <Image
              src={track.artworkUrl}
              alt={`${track.album || track.name} cover`}
              fill
              sizes="48px"
              className={`object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <Music className="w-6 h-6 text-gray-400" />
            </div>
          )}
           <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {track.url && (
                    <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:scale-110 transition-transform"
                    aria-label="Open in music app"
                    >
                    <ExternalLink className="h-4 w-4" />
                    </a>
                )}
           </div>
        </div>

        {/* Track Info */}
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
                <Volume2 className="h-3 w-3 text-green-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">
                {providerLabel}
                </span>
            </div>
          <h3 className="font-bold text-white text-sm truncate leading-tight">{track.name}</h3>
          <p className="text-xs text-white/80 truncate">{track.artist}</p>
        </div>

        {/* Play Button */}
        {track.previewUrl && (
            <button
              onClick={togglePlayback}
              className="bg-white text-secondary hover:scale-105 rounded-full p-2 transition-all shadow-lg"
              aria-label={isPlaying ? 'Pause' : 'Play preview'}
            >
              {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 ml-0.5 fill-current" />}
            </button>
        )}
      </div>

        {/* Progress Bar */}
      {track.previewUrl && isPlaying && (
        <>
          <div className="mt-3 bg-white/10 rounded-full h-1 w-full overflow-hidden">
            <div
              className="bg-green-400 h-1 rounded-full transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <audio ref={audioRef} src={track.previewUrl} preload="metadata" />
        </>
      )}
    </div>
  );
}
