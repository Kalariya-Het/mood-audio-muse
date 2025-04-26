
import React from 'react';
import { Message } from '@/types';
import MeditationPlayer from './MeditationPlayer';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <div className={`chat-bubble-${message.sender} animate-fade-in`}>
      <p>{message.text}</p>
      {message.audio && <MeditationPlayer audioText={message.audio} />}
    </div>
  );
};

export default ChatBubble;
