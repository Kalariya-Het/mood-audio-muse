
// Generate audio from text (in a real app, this would use a backend service)
export const generateAudio = async (text: string): Promise<string> => {
  // In a real implementation, this would call a backend service (like gTTS)
  // For the hackathon prototype, we'll use the browser's built-in speech synthesis
  
  return new Promise((resolve) => {
    // For the prototype, simulate API delay 
    setTimeout(() => {
      // In a real app, this would return an audio URL
      // For now, we'll just return a marker that the audio is ready
      resolve('speech-synthesis');
    }, 1500);
  });
};

// Play synthesized speech using the Web Speech API
export const playSpeechSynthesis = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;  // Slightly slower rate for meditation
    utterance.pitch = 1;   // Normal pitch
    
    // Get available voices and select a soothing one if possible
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Female') || 
      voice.name.includes('Google') || 
      voice.name.includes('Samantha')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    window.speechSynthesis.speak(utterance);
    return true;
  }
  return false;
};

// Recognize speech input
export const startSpeechRecognition = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window)) {
      reject('Speech recognition is not supported in this browser');
      return;
    }
    
    // @ts-ignore - the WebkitSpeechRecognition API is not in the TypeScript types
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };
    
    recognition.onerror = (event: any) => {
      reject(`Error occurred in recognition: ${event.error}`);
    };
    
    recognition.start();
  });
};
