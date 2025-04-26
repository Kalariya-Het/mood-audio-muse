
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { playSpeechSynthesis } from '@/utils/audioUtils';
import { Headphones, Volume2, VolumeX, Pause, SkipForward } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface MeditationPlayerProps {
  audioText: string;
}

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ audioText }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (speechRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const handlePlay = () => {
    if (isPaused) {
      resumeSpeech();
      return;
    }
    
    if (!isPlaying) {
      try {
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(audioText);
        utterance.rate = 0.9;
        speechRef.current = utterance;
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.name.includes('Female') || 
          voice.name.includes('Google') || 
          voice.name.includes('Samantha')
        );
        
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
        
        // Set up event handlers
        utterance.onstart = () => {
          setIsPlaying(true);
          setIsPaused(false);
          
          // Start progress timer
          const wordCount = audioText.split(' ').length;
          const totalDuration = wordCount * 200; // Approx duration in ms
          
          let startTime = Date.now();
          timerRef.current = window.setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
            setProgress(newProgress);
            
            if (newProgress >= 100) {
              clearInterval(timerRef.current!);
            }
          }, 100);
        };
        
        utterance.onend = () => {
          setIsPlaying(false);
          setIsPaused(false);
          setProgress(0);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        };
        
        // Start speaking
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Error with text-to-speech:', error);
        toast({
          variant: "destructive",
          title: "Audio Error",
          description: "Could not play meditation audio. Please try again."
        });
      }
    }
  };
  
  const handleStop = () => {
    if (isPlaying || isPaused) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  
  const handlePause = () => {
    if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  
  const resumeSpeech = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
    setIsPlaying(true);
    
    // Resume progress timer
    if (timerRef.current) {
      const wordCount = audioText.split(' ').length;
      const totalDuration = wordCount * 200;
      const remainingDuration = totalDuration * (1 - progress / 100);
      
      let startTime = Date.now();
      let startProgress = progress;
      
      timerRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const additionalProgress = (elapsed / remainingDuration) * (100 - startProgress);
        const newProgress = Math.min(startProgress + additionalProgress, 100);
        setProgress(newProgress);
        
        if (newProgress >= 100) {
          clearInterval(timerRef.current!);
        }
      }, 100);
    }
  };
  
  const skipToEnd = () => {
    handleStop();
    toast({
      title: "Meditation Skipped",
      description: "The meditation has been skipped."
    });
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-mindmosaic-dark-purple dark:text-white">
        <Headphones size={18} />
        <span className="text-sm font-medium">Meditation Audio</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {!isPlaying && !isPaused ? (
            <Button
              onClick={handlePlay}
              variant="outline"
              className="flex-1 bg-white dark:bg-mindmosaic-dark-gray hover:bg-mindmosaic-light-purple text-mindmosaic-dark-purple hover:text-mindmosaic-dark-purple dark:text-white flex gap-2 items-center"
            >
              <Volume2 size={16} />
              Play Meditation
            </Button>
          ) : (
            <>
              {isPlaying ? (
                <Button
                  onClick={handlePause}
                  variant="outline"
                  className="flex-1 bg-mindmosaic-light-purple/30 hover:bg-mindmosaic-light-purple text-mindmosaic-dark-purple flex gap-2 items-center"
                >
                  <Pause size={16} />
                  Pause
                </Button>
              ) : (
                <Button
                  onClick={resumeSpeech}
                  variant="outline"
                  className="flex-1 bg-mindmosaic-light-purple/30 hover:bg-mindmosaic-light-purple text-mindmosaic-dark-purple flex gap-2 items-center"
                >
                  <Volume2 size={16} />
                  Resume
                </Button>
              )}
              
              <Button
                onClick={handleStop}
                variant="outline"
                className="bg-white dark:bg-mindmosaic-dark-gray hover:bg-red-100 text-red-500 flex gap-2 items-center"
              >
                <VolumeX size={16} />
                Stop
              </Button>
              
              <Button
                onClick={skipToEnd}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-mindmosaic-light-purple hover:text-mindmosaic-purple"
                aria-label="Skip meditation"
              >
                <SkipForward size={16} />
              </Button>
            </>
          )}
        </div>
        
        {(isPlaying || isPaused) && (
          <div className="w-full bg-mindmosaic-light-gray dark:bg-mindmosaic-dark-gray/50 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-mindmosaic-purple transition-all duration-300"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationPlayer;
