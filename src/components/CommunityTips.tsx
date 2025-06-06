
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ThumbsUp } from 'lucide-react';
import { Tip } from '@/types';
import { useToast } from "@/hooks/use-toast";

const CommunityTips: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [newTip, setNewTip] = useState('');
  const { toast } = useToast();
  
  // Load tips from localStorage on component mount
  useEffect(() => {
    const savedTips = localStorage.getItem('mindMosaicTips');
    if (savedTips) {
      try {
        setTips(JSON.parse(savedTips));
      } catch (e) {
        console.error('Error loading tips:', e);
        // If parsing fails, clear corrupted data
        localStorage.removeItem('mindMosaicTips');
      }
    }
  }, []);
  
  // Save tips to localStorage whenever they change
  useEffect(() => {
    if (tips.length > 0) {
      localStorage.setItem('mindMosaicTips', JSON.stringify(tips));
    }
  }, [tips]);
  
  const handleAddTip = () => {
    if (newTip.trim()) {
      const tip: Tip = {
        id: `tip-${Date.now()}`,
        text: newTip.trim(),
        timestamp: new Date(),
        likes: 0,
        likedBy: []
      };
      
      setTips([...tips, tip]);
      setNewTip('');
      
      toast({
        title: "Tip Shared",
        description: "Thank you for sharing with the community!"
      });
    }
  };
  
  const handleLikeTip = (tipId: string) => {
    // Generate a random user ID if we don't have one yet
    const userId = localStorage.getItem('mindMosaicUserId') || 
      `user-${Math.random().toString(36).substring(2, 15)}`;
    
    if (!localStorage.getItem('mindMosaicUserId')) {
      localStorage.setItem('mindMosaicUserId', userId);
    }
    
    setTips(prevTips => 
      prevTips.map(tip => {
        if (tip.id === tipId) {
          // Check if user already liked this tip
          const alreadyLiked = tip.likedBy?.includes(userId);
          if (alreadyLiked) {
            // Unlike
            return {
              ...tip,
              likes: (tip.likes || 0) - 1,
              likedBy: tip.likedBy?.filter(id => id !== userId)
            };
          } else {
            // Like
            return {
              ...tip,
              likes: (tip.likes || 0) + 1,
              likedBy: [...(tip.likedBy || []), userId]
            };
          }
        }
        return tip;
      })
    );
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTip.trim()) {
      handleAddTip();
    }
  };
  
  // Check if a tip is liked by the current user
  const isLikedByUser = (tip: Tip): boolean => {
    const userId = localStorage.getItem('mindMosaicUserId');
    return Boolean(userId && tip.likedBy?.includes(userId));
  };
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-soft border border-mindmosaic-light-purple animate-fade-in">
      <h3 className="text-lg font-semibold text-mindmosaic-dark-purple mb-4">Community Tips</h3>
      
      <div className="mb-4 flex gap-2 items-center">
        <Input
          value={newTip}
          onChange={(e) => setNewTip(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share a wellness tip anonymously..."
          className="flex-1"
          aria-label="New tip input"
        />
        <Button 
          onClick={handleAddTip} 
          disabled={!newTip.trim()}
          className="bg-mindmosaic-purple hover:bg-mindmosaic-dark-purple"
          aria-label="Share tip"
        >
          <Send size={16} className="mr-1" /> Share
        </Button>
      </div>
      
      <div className="max-h-60 overflow-y-auto pr-1 scrollbar-thin">
        {tips.length > 0 ? (
          <div>
            {tips.map(tip => (
              <div key={tip.id} className="tip-item">
                <p className="text-sm">{tip.text}</p>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {new Date(tip.timestamp).toLocaleDateString()}
                  </p>
                  <Button
                    onClick={() => handleLikeTip(tip.id)}
                    variant="ghost"
                    size="sm"
                    className={`text-xs flex items-center gap-1 ${
                      isLikedByUser(tip) ? "text-mindmosaic-purple" : "text-gray-500"
                    }`}
                    aria-label={isLikedByUser(tip) ? "Unlike tip" : "Like tip"}
                  >
                    <ThumbsUp size={14} />
                    <span>{tip.likes || 0}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-6">No tips yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
};

export default CommunityTips;
