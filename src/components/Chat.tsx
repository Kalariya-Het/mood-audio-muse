
import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import RecommendationsCard from './RecommendationsCard';
import { Message, Mood } from '@/types';
import { detectMood } from '@/utils/moodDetection';
import { getMoodRecommendations, generateResponse } from '@/utils/recommendations';
import { generateAudio } from '@/utils/audioUtils';
import { v4 as uuidv4 } from 'uuid';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [processing, setProcessing] = useState(false);
  const [currentMood, setCurrentMood] = useState<Mood>('unknown');
  const [hasRecommendations, setHasRecommendations] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: uuidv4(),
      text: "Hi there! I'm your MindMosaic companion. How have you been feeling lately?",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  // Auto-scroll to the most recent message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setProcessing(true);
    
    try {
      // Detect mood from user message
      const detectedMood = detectMood(text);
      setCurrentMood(detectedMood);
      
      // Get recommendations for the mood
      const recommendations = getMoodRecommendations(detectedMood);
      
      // Generate response based on mood
      const responseText = generateResponse(detectedMood);
      
      // Generate meditation audio based on mood
      const audioText = recommendations.meditationScript;
      const audio = await generateAudio(audioText);
      
      // Add bot response with recommendations
      const botResponse: Message = {
        id: uuidv4(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        audio: audioText  // Store the text to be spoken
      };
      
      setMessages(prev => [...prev, botResponse]);
      setHasRecommendations(true);
    } catch (error) {
      console.error('Error processing message:', error);
      
      // Add error message
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
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {/* Show recommendations after mood detection */}
        {hasRecommendations && currentMood !== 'unknown' && (
          <RecommendationsCard 
            recommendations={getMoodRecommendations(currentMood)} 
            mood={currentMood}
          />
        )}
        
        {/* Invisible element for auto-scrolling */}
        <div ref={chatEndRef} />
      </div>
      
      <div className="px-4 pb-4">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          disabled={processing}
        />
      </div>
    </div>
  );
};

export default Chat;
