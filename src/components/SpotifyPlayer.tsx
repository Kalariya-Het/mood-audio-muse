
import React from 'react';
import { Button } from "@/components/ui/button";
import { Music } from 'lucide-react';
import { Recommendation } from '@/types';

interface SpotifyPlayerProps {
  music: Recommendation;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ music }) => {
  const spotifyId = music.spotifyId || '05wIrZSwuaVWhcv5FfqeH0'; // Default ID as fallback
  
  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-mindmosaic-dark-purple dark:text-white">
        <Music size={18} />
        <span className="text-sm font-medium">Music Recommendation</span>
      </div>
      
      <div className="bg-white dark:bg-mindmosaic-dark-gray p-3 rounded-md shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <p className="font-medium text-sm">{music.title}</p>
            <p className="text-xs text-mindmosaic-gray dark:text-white/70">{music.description}</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="border-mindmosaic-purple text-mindmosaic-purple hover:bg-mindmosaic-light-purple hover:text-mindmosaic-dark-purple dark:text-white dark:border-mindmosaic-light-purple"
            onClick={() => window.open(`https://open.spotify.com/track/${spotifyId}`, '_blank')}
            aria-label="Open in Spotify"
          >
            Listen on Spotify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
