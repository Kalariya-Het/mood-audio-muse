
import React, { useState } from 'react';
import Chat from '@/components/Chat';
import EnhancedCommunityTips from '@/components/EnhancedCommunityTips';
import { Button } from "@/components/ui/button";
import { MessageCircle, Info } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-mindmosaic-light-purple/30 to-white dark:from-mindmosaic-dark-purple/30 dark:to-mindmosaic-dark-gray transition-colors duration-300">
      <header className="py-6 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-mindmosaic-purple text-white flex items-center justify-center shadow-soft animate-float">
                <span className="font-bold text-xl">M</span>
              </div>
              <h1 className="text-2xl font-bold text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple">MindMosaic</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <DarkModeToggle />
              
              <Button 
                onClick={toggleInfo}
                variant="ghost" 
                size="icon"
                className="rounded-full hover:bg-mindmosaic-light-purple hover:text-mindmosaic-purple"
                aria-label="Show information"
              >
                <Info size={18} />
              </Button>
              
              <Button 
                onClick={toggleCommunity}
                variant="outline" 
                className="border-mindmosaic-purple text-mindmosaic-dark-purple hover:bg-mindmosaic-light-purple dark:text-white dark:border-mindmosaic-light-purple"
                aria-label={showCommunity ? "Hide community tips" : "Show community tips"}
              >
                <MessageCircle size={18} className="mr-2" />
                {showCommunity ? "Hide Community" : "Show Community"}
              </Button>
            </div>
          </div>
          
          {showInfo && (
            <div className="mt-4 p-4 bg-white/80 dark:bg-mindmosaic-dark-gray/80 backdrop-blur-sm rounded-xl border border-mindmosaic-light-purple shadow-soft animate-fade-in">
              <h2 className="text-lg font-semibold text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple mb-2">About MindMosaic</h2>
              <p className="text-sm text-mindmosaic-dark-gray dark:text-white/90">
                MindMosaic is your AI mental wellness companion. Share how you're feeling, and I'll provide personalized recommendations, meditation audio, and support resources tailored to your mood.
              </p>
              <div className="mt-3 text-sm">
                <h3 className="font-medium text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple">Features:</h3>
                <ul className="list-disc pl-5 text-mindmosaic-dark-gray dark:text-white/90">
                  <li>Mood detection and personalized recommendations</li>
                  <li>Music, movie, book and destination suggestions</li>
                  <li>Guided meditation audio appropriate for your mood</li>
                  <li>Voice input and text-to-speech capabilities</li>
                  <li>Community tips and journal features</li>
                  <li>Mood tracking over time</li>
                  <li>Dark mode support</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className={`md:col-span-${showCommunity ? '8' : '12'} h-[calc(100vh-240px)] bg-white/40 dark:bg-mindmosaic-dark-gray/40 backdrop-blur-sm border border-mindmosaic-light-purple rounded-xl shadow-soft overflow-hidden`}>
              <Chat />
            </div>
            
            {showCommunity && (
              <div className="md:col-span-4 h-[calc(100vh-240px)] overflow-hidden flex flex-col">
                <EnhancedCommunityTips />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center">
        <p className="text-sm text-mindmosaic-gray dark:text-white/70">
          MindMosaic - Your AI Mental Wellness Companion
        </p>
      </footer>
    </div>
  );
};

export default Index;
