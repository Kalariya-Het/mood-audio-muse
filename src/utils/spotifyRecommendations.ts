
import { Mood } from '@/types';

interface SpotifyRecommendation {
  name: string;
  artist: string;
  id: string;
  description: string;
}

// Hardcoded fallback recommendations for when API calls aren't available
const fallbackRecommendations: Record<Mood, SpotifyRecommendation[]> = {
  'happy': [
    {
      name: 'Walking on Sunshine',
      artist: 'Katrina and The Waves',
      id: '05wIrZSwuaVWhcv5FfqeH0',
      description: 'An upbeat classic to amplify your positive mood'
    },
    {
      name: 'Happy',
      artist: 'Pharrell Williams',
      id: '60nZcImufyMA1MKQY3dcCH',
      description: 'A joyful celebration of happiness'
    },
    {
      name: 'Good as Hell',
      artist: 'Lizzo',
      id: '6uAm7pG66O1XesXS9bpHSF',
      description: 'An empowering anthem about feeling good'
    }
  ],
  'sad': [
    {
      name: 'Clair de Lune',
      artist: 'Claude Debussy',
      id: '1BNCZGHj0VXxh5Usl9ajpf',
      description: 'A gentle, soothing piano piece to comfort you'
    },
    {
      name: 'Someone Like You',
      artist: 'Adele',
      id: '3bNv3VuUOKgrf5hu3YcuRo',
      description: 'A moving ballad about acceptance and moving on'
    },
    {
      name: 'Fix You',
      artist: 'Coldplay',
      id: '7LVHVU3tWfcxj5aiPFEW4Q',
      description: 'A song of comfort and healing'
    }
  ],
  'angry': [
    {
      name: 'Weightless',
      artist: 'Marconi Union',
      id: '5rgGSDz0YlzrOx8m8YHM10',
      description: 'Scientifically designed to reduce stress and anxiety'
    },
    {
      name: 'Take it Easy',
      artist: 'Eagles',
      id: '4yugZvBYaoREkJKtbG08Qr',
      description: 'A relaxing reminder to slow down'
    },
    {
      name: 'Breathe',
      artist: 'Télépopmusik',
      id: '4GYrZBQA2fFi2QBxTic1FQ',
      description: 'A calming electronic track to ease tension'
    }
  ],
  'neutral': [
    {
      name: 'Gymnopédie No.1',
      artist: 'Erik Satie',
      id: '5NGtFXVpXSvwunEIGeviY3',
      description: 'A peaceful, contemplative piano piece to inspire reflection'
    },
    {
      name: 'Intro',
      artist: 'The xx',
      id: '0J80S4nCD5XhI40J8ulZwE',
      description: 'A minimalist track perfect for focus and mindfulness'
    },
    {
      name: 'Both Sides Now',
      artist: 'Joni Mitchell',
      id: '2JPCO3NkHJFmKSI2Qo42GO',
      description: 'A thoughtful reflection on perspective'
    }
  ],
  'unknown': [
    {
      name: 'Here Comes the Sun',
      artist: 'The Beatles',
      id: '6dGnYIeXmHdcikdzNNDMm2',
      description: 'A gentle reminder that things are looking up'
    },
    {
      name: 'What a Wonderful World',
      artist: 'Louis Armstrong',
      id: '29U7stRjqHU6rMiS8BfaI9',
      description: 'A classic celebration of life\'s simple beauties'
    },
    {
      name: 'Somewhere Over the Rainbow',
      artist: 'Israel Kamakawiwoʻole',
      id: '1PmXm1881bonBI1AlG5uaH',
      description: 'A hopeful ukulele rendition of the timeless classic'
    }
  ]
};

// Function to get a random recommendation from the fallback list
const getRandomRecommendation = (mood: Mood): SpotifyRecommendation => {
  const recommendations = fallbackRecommendations[mood] || fallbackRecommendations.neutral;
  const randomIndex = Math.floor(Math.random() * recommendations.length);
  return recommendations[randomIndex];
};

// In a real app, this would call the Spotify API
export const getSpotifyRecommendation = async (mood: Mood, apiKey?: string): Promise<SpotifyRecommendation> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For now, just use our hardcoded recommendations
    // In a real implementation, we would make an API call to Spotify
    return getRandomRecommendation(mood);
  } catch (error) {
    console.error('Error fetching Spotify recommendations:', error);
    return getRandomRecommendation(mood);
  }
};
