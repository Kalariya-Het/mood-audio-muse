
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { playSpeechSynthesis } from '@/utils/audioUtils';
import { Headphones, Volume2, VolumeX } from 'lucide-react';

interface MeditationPlayerProps {
  audioText: string;
}

const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ audioText }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (!isPlaying) {
      const success = playSpeechSynthesis(audioText);
      if (success) {
        setIsPlaying(true);
        
        // Reset playing state once audio ends (approximate duration based on word count)
        const wordCount = audioText.split(' ').length;
        const approxDurationMs = wordCount * 200; // ~200ms per word
        setTimeout(() => setIsPlaying(false), approxDurationMs);
      }
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-mindmosaic-dark-purple">
        <Headphones size={18} />
        <span className="text-sm font-medium">Meditation Audio</span>
      </div>
      <Button
        onClick={handlePlay}
        variant="outline"
        className="bg-white hover:bg-mindmosaic-light-purple text-mindmosaic-dark-purple hover:text-mindmosaic-dark-purple flex gap-2 items-center"
        disabled={isPlaying}
      >
        {isPlaying ? (
          <>
            <Volume2 size={16} className="animate-pulse-gentle" />
            Playing...
          </>
        ) : (
          <>
            <Volume2 size={16} />
            Play Meditation
          </>
        )}
      </Button>
    </div>
  );
};

export default MeditationPlayer;
