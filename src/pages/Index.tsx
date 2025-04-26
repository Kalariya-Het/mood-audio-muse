
import React, { useState } from 'react';
import Chat from '@/components/Chat';
import CommunityTips from '@/components/CommunityTips';
import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';

const Index = () => {
  const [showCommunity, setShowCommunity] = useState(false);
  
  const toggleCommunity = () => {
    setShowCommunity(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mindmosaic-light-purple/30 to-white">
      <header className="py-6 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-mindmosaic-purple text-white flex items-center justify-center shadow-soft animate-float">
                <span className="font-bold text-xl">M</span>
              </div>
              <h1 className="text-2xl font-bold text-mindmosaic-dark-purple">MindMosaic</h1>
            </div>
            
            <Button 
              onClick={toggleCommunity}
              variant="outline" 
              className="border-mindmosaic-purple text-mindmosaic-dark-purple hover:bg-mindmosaic-light-purple"
            >
              <MessageCircle size={18} className="mr-2" />
              {showCommunity ? "Hide Community Tips" : "Show Community Tips"}
            </Button>
          </div>
        </div>
      </header>
      
      <main className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className={`md:col-span-${showCommunity ? '8' : '12'} h-[calc(100vh-240px)] bg-white/40 backdrop-blur-sm border border-mindmosaic-light-purple rounded-xl shadow-soft overflow-hidden`}>
              <Chat />
            </div>
            
            {showCommunity && (
              <div className="md:col-span-4 h-[calc(100vh-240px)] overflow-hidden flex flex-col">
                <CommunityTips />
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="py-4 px-6 text-center">
        <p className="text-sm text-mindmosaic-gray">
          MindMosaic - Your AI Mental Wellness Companion
        </p>
      </footer>
    </div>
  );
};

export default Index;
