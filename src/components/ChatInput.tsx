
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, MicOff } from 'lucide-react';
import { startSpeechRecognition } from '@/utils/audioUtils';
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Effect to detect touch capability
  useEffect(() => {
    const isTouchCapable = 'ontouchstart' in window || 
                          navigator.maxTouchPoints > 0;
    
    // Add touch-specific classes if device has touch capability
    if (isTouchCapable) {
      document.body.classList.add('touch-device');
    }
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && message.trim()) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = async () => {
    if (isListening) return;
    
    try {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now and I'll capture your message"
      });
      
      const transcript = await startSpeechRecognition();
      if (transcript) {
        setMessage(transcript);
        // Focus input after getting speech
        if (inputRef.current) inputRef.current.focus();
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Speech Recognition Error",
        description: typeof err === 'string' ? err : "Couldn't understand audio. Please try again or type your message."
      });
    } finally {
      setIsListening(false);
    }
  };

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-mindmosaic-dark-gray p-2 rounded-lg shadow-sm border border-mindmosaic-light-purple">
      <Input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Share how you're feeling..."
        className="flex-1 border-none focus-visible:ring-mindmosaic-purple focus-visible:ring-opacity-30 dark:bg-mindmosaic-dark-gray dark:text-white dark:placeholder:text-white/50"
        disabled={disabled || isListening}
        aria-label="Message input"
        // Enhanced touch handling
        style={{ 
          fontSize: isMobile ? '16px' : '14px',  // Prevent iOS zoom on focus
          height: isMobile ? '44px' : '40px'      // Larger touch target on mobile
        }}
      />
      <Button
        onClick={handleVoiceInput}
        variant="ghost"
        size="icon"
        className={`rounded-full ${isListening ? 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400' : 'hover:bg-mindmosaic-light-purple hover:text-mindmosaic-purple dark:hover:bg-mindmosaic-dark-purple/50'}`}
        disabled={disabled}
        aria-label={isListening ? "Listening" : "Use voice input"}
        // Enhanced touch handling
        style={{ 
          height: isMobile ? '44px' : '40px',
          width: isMobile ? '44px' : '40px'
        }}
      >
        {isListening ? <MicOff size={isMobile ? 20 : 18} /> : <Mic size={isMobile ? 20 : 18} />}
      </Button>
      <Button
        onClick={handleSend}
        variant="default"
        size="icon"
        className="bg-mindmosaic-purple hover:bg-mindmosaic-dark-purple rounded-full"
        disabled={disabled || !message.trim()}
        aria-label="Send message"
        // Enhanced touch handling
        style={{ 
          height: isMobile ? '44px' : '40px',
          width: isMobile ? '44px' : '40px'
        }}
      >
        <Send size={isMobile ? 20 : 18} />
      </Button>
    </div>
  );
};

export default ChatInput;
