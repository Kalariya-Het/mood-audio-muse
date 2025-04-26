
import Sentiment from 'sentiment';
import { Mood } from '@/types';

// Initialize sentiment analyzer
const sentiment = new Sentiment();

export const detectMood = (text: string): Mood => {
  // Simple rule-based mood detection using sentiment analysis
  const analysis = sentiment.analyze(text);
  
  // Check for specific mood words
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('happy') || lowerText.includes('joy') || lowerText.includes('great') || 
      lowerText.includes('excited') || lowerText.includes('good')) {
    return 'happy';
  }
  
  if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('unhappy') || 
      lowerText.includes('down') || lowerText.includes('blue')) {
    return 'sad';
  }
  
  if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('frustrated') || 
      lowerText.includes('annoyed') || lowerText.includes('upset')) {
    return 'angry';
  }
  
  // Use sentiment analysis as fallback
  if (analysis.score > 2) return 'happy';
  if (analysis.score < -2) return 'sad';
  if (analysis.comparative < -1 && analysis.negative.length > 0) return 'angry';
  
  return 'neutral';
};

export const getMoodEmoji = (mood: Mood): string => {
  switch (mood) {
    case 'happy': return '😊';
    case 'sad': return '😔';
    case 'angry': return '😠';
    case 'neutral': return '😐';
    default: return '❓';
  }
};
