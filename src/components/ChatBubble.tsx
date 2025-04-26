
import React from 'react';
import { Message } from '@/types';
import MeditationPlayer from './MeditationPlayer';
import { Button } from "@/components/ui/button";
import { Volume2 } from 'lucide-react';
import { playSpeechSynthesis } from '@/utils/audioUtils';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const handleSpeakMessage = () => {
    if (message.text) {
      playSpeechSynthesis(message.text);
    }
  };

  return (
    <div className={`chat-bubble-${message.sender} animate-fade-in`}>
      <div className="flex justify-between items-start">
        <p className="pr-2">{message.text}</p>
        {message.sender === 'bot' && (
          <Button 
            onClick={handleSpeakMessage} 
            variant="ghost" 
            size="icon" 
            className="mt-0 -mr-2 h-8 w-8 shrink-0 rounded-full"
            aria-label="Speak message"
          >
            <Volume2 size={16} />
          </Button>
        )}
      </div>
      {message.audio && <MeditationPlayer audioText={message.audio} />}
    </div>
  );
};

export default ChatBubble;
