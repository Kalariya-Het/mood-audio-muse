
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Fixed import
import { v4 as uuidv4 } from 'uuid';
import { Tip } from '@/types';
import { MessageCircle, Send, ThumbsUp } from 'lucide-react';

const EnhancedCommunityTips: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [newTip, setNewTip] = useState('');
  const [userId, setUserId] = useState('');

  // Generate anonymous user ID if not present
  useEffect(() => {
    const storedId = localStorage.getItem('anonymousUserId');
    if (storedId) {
      setUserId(storedId);
    } else {
      const newId = uuidv4();
      localStorage.setItem('anonymousUserId', newId);
      setUserId(newId);
    }

    // Load tips from localStorage
    const savedTips = localStorage.getItem('communityTips');
    if (savedTips) {
      try {
        const parsed = JSON.parse(savedTips);
        setTips(parsed.map((tip: any) => ({
          ...tip,
          timestamp: new Date(tip.timestamp)
        })));
      } catch (e) {
        console.error('Error parsing tips:', e);
      }
    } else {
      // Example tips
      const exampleTips = [
        {
          id: uuidv4(),
          text: "Take 5 deep breaths when feeling overwhelmed.",
          timestamp: new Date(),
          likes: 3,
          likedBy: []
        },
        {
          id: uuidv4(),
          text: "Keep a gratitude journal - write down 3 things you're thankful for each day.",
          timestamp: new Date(Date.now() - 86400000), // 1 day ago
          likes: 5,
          likedBy: []
        }
      ];
      setTips(exampleTips);
      localStorage.setItem('communityTips', JSON.stringify(exampleTips));
    }
  }, []);

  const handleAddTip = () => {
    if (newTip.trim()) {
      const tip: Tip = {
        id: uuidv4(),
        text: newTip,
        timestamp: new Date(),
        likes: 0,
        likedBy: []
      };

      const updatedTips = [...tips, tip];
      setTips(updatedTips);
      localStorage.setItem('communityTips', JSON.stringify(updatedTips));
      setNewTip('');
    }
  };

  const handleLike = (id: string) => {
    const updatedTips = tips.map(tip => {
      if (tip.id === id) {
        // Check if user already liked this tip
        if (!tip.likedBy?.includes(userId)) {
          return {
            ...tip,
            likes: (tip.likes || 0) + 1,
            likedBy: [...(tip.likedBy || []), userId]
          };
        }
      }
      return tip;
    });

    setTips(updatedTips);
    localStorage.setItem('communityTips', JSON.stringify(updatedTips));
  };

  const sortedTips = [...tips].sort((a, b) => {
    // First by likes (descending)
    if ((b.likes || 0) !== (a.likes || 0)) {
      return (b.likes || 0) - (a.likes || 0);
    }
    // Then by timestamp (newest first)
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <Card className="h-full bg-white/40 dark:bg-mindmosaic-dark-gray/40 backdrop-blur-sm border-mindmosaic-light-purple shadow-soft overflow-hidden flex flex-col">
      <CardHeader className="px-4 py-3 bg-mindmosaic-light-purple/30 dark:bg-mindmosaic-dark-purple/30">
        <CardTitle className="text-lg font-medium flex items-center">
          <MessageCircle size={18} className="mr-2" />
          Community Tips
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4">
        {sortedTips.length === 0 ? (
          <div className="text-center py-4 text-mindmosaic-gray dark:text-white/70">
            No tips yet. Be the first to share!
          </div>
        ) : (
          <div className="space-y-3">
            {sortedTips.map((tip) => (
              <div key={tip.id} className="tip-item dark:bg-yellow-900/20 dark:border-yellow-700">
                <p className="text-sm">{tip.text}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-mindmosaic-gray dark:text-white/60">
                    {formatRelativeTime(tip.timestamp)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(tip.id)}
                    className="h-6 text-xs py-0 px-2 hover:bg-yellow-200 dark:hover:bg-yellow-900/30"
                    disabled={tip.likedBy?.includes(userId)}
                    aria-label="Like this tip"
                  >
                    <ThumbsUp size={14} className={`mr-1 ${tip.likedBy?.includes(userId) ? 'text-yellow-600 dark:text-yellow-400' : ''}`} />
                    {tip.likes || 0}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <div className="p-3 border-t border-mindmosaic-light-purple bg-white/60 dark:bg-mindmosaic-dark-gray/60">
        <div className="flex gap-2">
          <Input
            value={newTip}
            onChange={(e) => setNewTip(e.target.value)}
            placeholder="Share a wellness tip..."
            className="flex-grow bg-white dark:bg-mindmosaic-dark-gray dark:text-white"
            maxLength={200}
            aria-label="Enter your wellness tip"
          />
          <Button
            onClick={handleAddTip}
            disabled={!newTip.trim()}
            className="bg-mindmosaic-purple hover:bg-mindmosaic-dark-purple"
          >
            <Send size={16} />
          </Button>
        </div>
        <div className="text-xs text-right mt-1 text-mindmosaic-gray dark:text-white/60">
          {newTip.length}/200
        </div>
      </div>
    </Card>
  );
};

export default EnhancedCommunityTips;
