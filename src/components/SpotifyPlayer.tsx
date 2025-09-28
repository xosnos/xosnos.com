'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, ExternalLink, Music, Volume2 } from 'lucide-react';
import Image from 'next/image';

interface TopTrack {
  id: string;
  name: string;
  artists: string;
  album: string;
  image: string | null;
  spotifyUrl: string;
  previewUrl: string | null;
  duration: number;
}

export default function SpotifyPlayer() {
  const [topTrack, setTopTrack] = useState<TopTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    fetchTopTrack();
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
  }, [topTrack]);

  const fetchTopTrack = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/spotify/top-track');
      
      if (!response.ok) {
        throw new Error('Failed to fetch top track');
      }
      
      const data = await response.json();
      setTopTrack(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load track');
    } finally {
      setLoading(false);
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !topTrack?.previewUrl) return;

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


  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="text-secondary">Loading current top track...</span>
        </div>
      </div>
    );
  }

  if (error || !topTrack) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="flex items-center space-x-3 text-red-500">
          <Music className="h-6 w-6" />
          <span>Unable to load Spotify track</span>
        </div>
        <button 
          onClick={fetchTopTrack}
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
          Current Top Track from Spotify
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {topTrack.image && (
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={topTrack.image}
              alt={`${topTrack.album} cover`}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{topTrack.name}</h3>
          <p className="text-sm text-gray-600 truncate">{topTrack.artists}</p>
          <p className="text-xs text-gray-500 truncate">{topTrack.album}</p>
        </div>

        <div className="flex items-center space-x-2">
          {topTrack.previewUrl && (
            <button
              onClick={togglePlayback}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play preview'}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </button>
          )}

          <a
            href={topTrack.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 transition-colors"
            aria-label="Open in Spotify"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {topTrack.previewUrl && (
        <>
          <div className="mt-4 bg-gray-200 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <audio
            ref={audioRef}
            src={topTrack.previewUrl}
            preload="metadata"
          />

          {!topTrack.previewUrl && (
            <p className="text-xs text-gray-500 mt-2 text-center">
              Preview not available for this track
            </p>
          )}
        </>
      )}
    </div>
  );
}