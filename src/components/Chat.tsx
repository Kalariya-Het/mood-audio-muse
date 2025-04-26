import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import RecommendationsCard from './RecommendationsCard';
import MoodChart from './MoodChart';
import Journal from './Journal';
import SpotifyPlayer from './SpotifyPlayer';
import { Message, Mood, MoodRecord } from '@/types';
import { detectMood } from '@/utils/moodDetection';
import { getMoodRecommendations, generateResponse } from '@/utils/recommendations';
import { getSpotifyRecommendation } from '@/utils/spotifyRecommendations';
import { generateAudio, playSpeechSynthesis } from '@/utils/audioUtils';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [processing, setProcessing] = useState(false);
  const [currentMood, setCurrentMood] = useState<Mood>('unknown');
  const [hasRecommendations, setHasRecommendations] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodRecord[]>([]);
  const [showMoodChart, setShowMoodChart] = useState(false);
  const { toast } = useToast();
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    const savedMoodHistory = localStorage.getItem('moodHistory');
    if (savedMoodHistory) {
      try {
        const parsed = JSON.parse(savedMoodHistory);
        setMoodHistory(parsed.map((record: any) => ({
          ...record,
          timestamp: new Date(record.timestamp)
        })));
      } catch (e) {
        console.error('Error parsing mood history:', e);
      }
    }
    
    const welcomeMessage: Message = {
      id: uuidv4(),
      text: "Hi there! I'm your MindMosaic companion. How have you been feeling lately?",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    
    const browserSupportMessage = checkBrowserSupport();
    if (browserSupportMessage) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: uuidv4(),
          text: browserSupportMessage,
          sender: 'bot',
          timestamp: new Date()
        }]);
      }, 1000);
    }
    
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
          console.log('Service Worker registration failed:', error);
        });
      });
    }
  }, []);
  
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    if (!isFirstRender.current && messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.sender === 'bot' && latestMessage.text) {
        if (!latestMessage.audio && latestMessage.text.length < 200) {
          setTimeout(() => {
            playSpeechSynthesis(latestMessage.text);
          }, 500);
        }
      }
    }
    isFirstRender.current = false;
  }, [messages]);
  
  const checkBrowserSupport = (): string | null => {
    let missingFeatures = [];
    
    if (!('webkitSpeechRecognition' in window)) {
      missingFeatures.push('voice input');
    }
    
    if (!('speechSynthesis' in window)) {
      missingFeatures.push('text-to-speech');
    }
    
    if (!('localStorage' in window)) {
      missingFeatures.push('data storage');
    }
    
    if (missingFeatures.length > 0) {
      return `Note: Your browser has limited support for ${missingFeatures.join(' and ')}. For the best experience, please use Chrome, Edge, or Firefox.`;
    }
    
    return null;
  };
  
  const saveMoodToHistory = (mood: Mood) => {
    if (mood === 'unknown') return;
    
    const newRecord: MoodRecord = {
      mood,
      timestamp: new Date()
    };
    
    const updatedHistory = [...moodHistory, newRecord];
    setMoodHistory(updatedHistory);
    
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
    
    if (updatedHistory.length >= 3 && !showMoodChart) {
      setShowMoodChart(true);
    }
  };
  
  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setProcessing(true);
    
    try {
      const detectedMood = detectMood(text);
      setCurrentMood(detectedMood);
      saveMoodToHistory(detectedMood);
      
      const recommendations = getMoodRecommendations(detectedMood);
      
      let spotifyRec = null;
      try {
        spotifyRec = await getSpotifyRecommendation(detectedMood);
        if (spotifyRec) {
          recommendations.music = {
            ...recommendations.music,
            title: `${spotifyRec.name} by ${spotifyRec.artist}`,
            description: spotifyRec.description,
            spotifyId: spotifyRec.id
          };
        }
      } catch (error) {
        console.error('Error fetching Spotify recommendation:', error);
      }
      
      const responseText = generateResponse(detectedMood);
      
      const audioText = recommendations.meditationScript;
      const audio = await generateAudio(audioText);
      
      const botResponse: Message = {
        id: uuidv4(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        audio: audioText
      };
      
      setMessages(prev => [...prev, botResponse]);
      setHasRecommendations(true);
      
      toast({
        title: `Mood detected: ${detectedMood}`,
        description: "I've prepared personalized recommendations for you.",
      });
    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage: Message = {
        id: uuidv4(),
        text: "I'm having trouble understanding right now. Could you try again?",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setProcessing(false);
    }
  };
  
  const toggleMoodChart = () => {
    setShowMoodChart(prev => !prev);
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {hasRecommendations && currentMood !== 'unknown' && (
          <>
            <RecommendationsCard 
              recommendations={getMoodRecommendations(currentMood)} 
              mood={currentMood}
            />
            <SpotifyPlayer music={getMoodRecommendations(currentMood).music} />
          </>
        )}
        
        <Journal currentMood={currentMood} />
        
        {moodHistory.length >= 2 && showMoodChart && (
          <MoodChart moodHistory={moodHistory} />
        )}
        
        <div ref={chatEndRef} />
      </div>
      
      <div className="px-4 pb-4">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={processing}
        />
        
        {moodHistory.length >= 2 && (
          <div className="flex justify-center mt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-mindmosaic-purple text-mindmosaic-dark-purple hover:bg-mindmosaic-light-purple dark:text-white dark:border-mindmosaic-light-purple"
              onClick={toggleMoodChart}
            >
              {showMoodChart ? "Hide Mood Chart" : "Show Mood Chart"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
