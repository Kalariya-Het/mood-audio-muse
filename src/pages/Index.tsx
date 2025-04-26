
import React, { useState } from 'react';
import Chat from '@/components/Chat';
import EnhancedCommunityTips from '@/components/EnhancedCommunityTips';
import { Button } from "@/components/ui/button";
import { MessageCircle, Info, Home, Brain } from 'lucide-react';
import DarkModeToggle from '@/components/DarkModeToggle';

const Index = () => {
  const [showCommunity, setShowCommunity] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  const toggleCommunity = () => {
    setShowCommunity(prev => !prev);
  };

  const toggleInfo = () => {
    setShowInfo(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mindmosaic-light-purple/50 to-white dark:from-mindmosaic-dark-purple/40 dark:to-mindmosaic-dark-gray transition-colors duration-500">
      <header className="py-6 px-6 md:px-10 backdrop-blur-sm bg-white/30 dark:bg-mindmosaic-dark-gray/30 sticky top-0 z-10 border-b border-mindmosaic-light-purple/20 dark:border-mindmosaic-purple/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-mindmosaic-purple to-mindmosaic-dark-purple text-white flex items-center justify-center shadow-soft animate-float">
                <Brain size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-mindmosaic-dark-purple to-mindmosaic-purple bg-clip-text text-transparent">MindMosaic</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <DarkModeToggle />
              
              <Button 
                onClick={toggleInfo}
                variant={showInfo ? "secondary" : "ghost"}
                size="icon"
                className="rounded-full hover:bg-mindmosaic-light-purple hover:text-mindmosaic-purple"
                aria-label="Show information"
              >
                <Info size={18} />
              </Button>
              
              <Button 
                onClick={toggleCommunity}
                variant={showCommunity ? "secondary" : "outline"} 
                className="border-mindmosaic-purple text-mindmosaic-dark-purple hover:bg-mindmosaic-light-purple dark:text-white dark:border-mindmosaic-light-purple"
                aria-label={showCommunity ? "Hide community tips" : "Show community tips"}
              >
                <MessageCircle size={18} className="mr-2" />
                {showCommunity ? "Hide Community" : "Show Community"}
              </Button>
            </div>
          </div>
          
          {showInfo && (
            <div className="mt-4 p-6 bg-white/80 dark:bg-mindmosaic-dark-gray/80 backdrop-blur-md rounded-xl border border-mindmosaic-light-purple shadow-soft animate-fade-in">
              <h2 className="text-xl font-semibold text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple mb-3">About MindMosaic</h2>
              <p className="text-sm md:text-base text-mindmosaic-dark-gray dark:text-white/90">
                MindMosaic is your AI mental wellness companion. Share how you're feeling, and I'll provide personalized recommendations, meditation audio, and support resources tailored to your mood.
              </p>
              <div className="mt-4 text-sm md:text-base">
                <h3 className="font-medium text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple">Features:</h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  <ul className="list-disc pl-5 text-mindmosaic-dark-gray dark:text-white/90">
                    <li>Mood detection and personalized recommendations</li>
                    <li>Music, movie, book and destination suggestions</li>
                    <li>Guided meditation audio appropriate for your mood</li>
                    <li>Voice input and text-to-speech capabilities</li>
                  </ul>
                  <ul className="list-disc pl-5 text-mindmosaic-dark-gray dark:text-white/90">
                    <li>Community tips and journal features</li>
                    <li>Mood tracking over time</li>
                    <li>Dark mode support</li>
                    <li>Emergency support resources</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className={`md:col-span-${showCommunity ? '8' : '12'} h-[calc(100vh-240px)] bg-white/60 dark:bg-mindmosaic-dark-gray/60 backdrop-blur-md border border-mindmosaic-light-purple/50 rounded-xl shadow-soft transition-all duration-300 ease-in-out animate-fade-in overflow-hidden hover:shadow-lg`}>
              <Chat />
            </div>
            
            {showCommunity && (
              <div className="md:col-span-4 h-[calc(100vh-240px)] overflow-hidden flex flex-col animate-fade-in bg-white/60 dark:bg-mindmosaic-dark-gray/60 backdrop-blur-md border border-mindmosaic-light-purple/50 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300">
                <EnhancedCommunityTips />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-6 text-center backdrop-blur-sm bg-white/30 dark:bg-mindmosaic-dark-gray/30 border-t border-mindmosaic-light-purple/20 dark:border-mindmosaic-purple/20">
        <p className="text-sm text-mindmosaic-gray dark:text-white/70">
          MindMosaic - Your AI Mental Wellness Companion
        </p>
      </footer>
    </div>
  );
};

export default Index;
