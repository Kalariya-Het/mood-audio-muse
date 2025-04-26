
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { playSpeechSynthesis, getRandomMeditationBgTrack } from '@/utils/audioUtils';

interface MeditationPlayerProps {
  audioText: string;
}

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ audioText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgMusicEnabled, setBgMusicEnabled] = useState(true);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgTrackRef = useRef<string>('');
  
  useEffect(() => {
    // Get a random background track when the component mounts
    bgTrackRef.current = getRandomMeditationBgTrack();
    
    // Initialize the audio element
    bgAudioRef.current = new Audio(bgTrackRef.current);
    bgAudioRef.current.loop = true;
    bgAudioRef.current.volume = 0.2;  // Lower volume for background
    
    return () => {
      // Clean up audio when component unmounts
      if (bgAudioRef.current) {
        bgAudioRef.current.pause();
        bgAudioRef.current = null;
      }
      
      // Also stop any ongoing speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const handlePlayPause = () => {
    if (isPlaying) {
      // Stop playback
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      
      if (bgAudioRef.current && bgMusicEnabled) {
        bgAudioRef.current.pause();
      }
    } else {
      // Start playback
      if (bgAudioRef.current && bgMusicEnabled) {
        bgAudioRef.current.currentTime = 0;
        bgAudioRef.current.play().catch(error => {
          console.error("Error playing background audio:", error);
        });
      }
      
      playSpeechSynthesis(audioText);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const toggleBgMusic = () => {
    const newState = !bgMusicEnabled;
    setBgMusicEnabled(newState);
    
    if (bgAudioRef.current) {
      if (newState && isPlaying) {
        bgAudioRef.current.play().catch(error => {
          console.error("Error playing background audio:", error);
        });
      } else {
        bgAudioRef.current.pause();
      }
    }
  };
  
  return (
    <div className="mt-3 p-3 bg-mindmosaic-light-purple/60 rounded-lg flex items-center gap-3 dark:bg-mindmosaic-dark-purple/60">
      <Button
        onClick={handlePlayPause}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full bg-white dark:bg-mindmosaic-light-purple text-mindmosaic-purple"
        aria-label={isPlaying ? "Pause meditation" : "Play meditation"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </Button>
      
      <div className="flex-1">
        <p className="text-xs font-medium">Guided Meditation</p>
        <p className="text-xs opacity-80">
          {isPlaying ? "Playing..." : "Click to play"}
        </p>
      </div>
      
      <Button
        onClick={toggleBgMusic}
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full hover:bg-white/20"
        aria-label={bgMusicEnabled ? "Disable background music" : "Enable background music"}
      >
        {bgMusicEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </Button>
    </div>
  );
};

export default MeditationPlayer;
