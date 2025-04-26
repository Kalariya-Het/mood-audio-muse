
import React from 'react';
import { Button } from "@/components/ui/button";
import { Music, ExternalLink } from 'lucide-react';
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
      
      <div className="bg-gradient-to-r from-[#1DB954]/10 to-[#1DB954]/5 dark:from-[#1DB954]/20 dark:to-[#1DB954]/5 p-4 rounded-md shadow-sm border border-[#1DB954]/30 transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <p className="font-medium text-sm text-mindmosaic-dark-purple dark:text-white">{music.title}</p>
            <p className="text-xs text-mindmosaic-gray dark:text-white/70">{music.description}</p>
          </div>
          
          <div className="flex gap-2 self-end sm:self-auto">
            {music.spotifyId && (
              <iframe 
                src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator&theme=0`}
                width="100" 
                height="80" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-md border-0 bg-transparent hidden sm:block"
              ></iframe>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954]/10 hover:text-[#1DB954] dark:text-white dark:border-[#1DB954] dark:hover:bg-[#1DB954]/20"
              onClick={() => window.open(`https://open.spotify.com/track/${spotifyId}`, '_blank')}
              aria-label="Open in Spotify"
            >
              <ExternalLink size={14} className="mr-1" />
              Listen on Spotify
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
