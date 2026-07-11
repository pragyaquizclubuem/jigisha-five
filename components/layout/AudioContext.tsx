'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  playAudio: () => void;
  pauseAudio: () => void;
  toggleAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Please place your background music file at public/audio/bgm.mp3
    audioRef.current = new Audio('/bgaudio.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      try {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined && typeof playPromise.then === 'function') {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(err => {
              // Log as normal console info instead of error to avoid console pollution
              console.log("ℹ️ [AudioContext] Autoplay blocked by browser. Playback will start upon user interaction. Details:", err.message || err);
            });
        } else {
          setIsPlaying(true);
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.log("ℹ️ [AudioContext] Synchronous exception during playAudio():", errMsg);
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioContext.Provider value={{ isPlaying, playAudio, pauseAudio, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
