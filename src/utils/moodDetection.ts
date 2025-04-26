
import Sentiment from 'sentiment';
import { Mood } from '@/types';

// Initialize sentiment analyzer
const sentiment = new Sentiment();

// Simple client-side mood detection using sentiment analysis (VADER-like approach)
export const detectMood = (text: string): Mood => {
  // Simple rule-based mood detection using sentiment analysis
  const analysis = sentiment.analyze(text);
  
  // Check for specific mood words
  const lowerText = text.toLowerCase();
  
  // Check for expanded mood detection
  if (lowerText.includes('anxious') || lowerText.includes('anxiety') || lowerText.includes('nervous') ||
      lowerText.includes('worry') || lowerText.includes('worried') || lowerText.includes('panic')) {
    return 'anxious';
  }
  
  if (lowerText.includes('stress') || lowerText.includes('stressed') || lowerText.includes('overwhelm') || 
      lowerText.includes('pressure') || lowerText.includes('burden')) {
    return 'stressed';
  }
  
  if (lowerText.includes('calm') || lowerText.includes('peaceful') || lowerText.includes('relaxed') ||
      lowerText.includes('tranquil') || lowerText.includes('serene')) {
    return 'calm';
  }
  
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

// Try to use server-side mood detection if available
export const detectMoodHybrid = async (text: string): Promise<Mood> => {
  try {
    // First try server-side detection (using HuggingFace)
    const response = await fetch('/api/detect-mood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    
    if (response.ok) {
      const result = await response.json();
      return result.mood;
    } else {
      // If server fails, fall back to client-side
      console.log('Server-side mood detection failed, falling back to client-side');
      return detectMood(text);
    }
  } catch (error) {
    // Network error or other issue, fall back to client-side
    console.log('Error with server-side mood detection:', error);
    return detectMood(text);
  }
};

export const getMoodEmoji = (mood: Mood): string => {
  switch (mood) {
    case 'happy': return '😊';
    case 'sad': return '😔';
    case 'angry': return '😠';
    case 'anxious': return '😰';
    case 'stressed': return '😓';
    case 'calm': return '😌';
    case 'neutral': return '😐';
    default: return '❓';
  }
};
