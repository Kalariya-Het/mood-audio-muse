
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
      name: "Walking on Sunshine",
      artist: "Katrina and The Waves",
      id: "05wIrZSwuaVWhcv5FfqeH0",
      description: "An upbeat classic to amplify your positive mood"
    },
    {
      name: "Happy",
      artist: "Pharrell Williams",
      id: "60nZcImufyMA1MKQY3dcCH",
      description: "A joyful celebration of happiness"
    },
    {
      name: "Good as Hell",
      artist: "Lizzo",
      id: "6uAm7pG66O1XesXS9bpHSF",
      description: "An empowering anthem about feeling good"
    }
  ],
  'sad': [
    {
      name: "Clair de Lune",
      artist: "Claude Debussy",
      id: "1BNCZGHj0VXxh5Usl9ajpf",
      description: "A gentle, soothing piano piece to comfort you"
    },
    {
      name: "Someone Like You",
      artist: "Adele",
      id: "3bNv3VuUOKgrf5hu3YcuRo",
      description: "A moving ballad about acceptance and moving on"
    },
    {
      name: "Fix You",
      artist: "Coldplay",
      id: "7LVHVU3tWfcxj5aiPFEW4Q",
      description: "A song of comfort and healing"
    }
  ],
  'angry': [
    {
      name: "Weightless",
      artist: "Marconi Union",
      id: "5rgGSDz0YlzrOx8m8YHM10",
      description: "Scientifically designed to reduce stress and anxiety"
    },
    {
      name: "Take it Easy",
      artist: "Eagles",
      id: "4yugZvBYaoREkJKtbG08Qr",
      description: "A relaxing reminder to slow down"
    },
    {
      name: "Breathe",
      artist: "Télépopmusik",
      id: "4GYrZBQA2fFi2QBxTic1FQ",
      description: "A calming electronic track to ease tension"
    }
  ],
  'anxious': [
    {
      name: "Weightless",
      artist: "Marconi Union",
      id: "5rgGSDz0YlzrOx8m8YHM10",
      description: "Scientifically designed to reduce anxiety"
    },
    {
      name: "Northern Lights",
      artist: "Ólafur Arnalds",
      id: "5FKDODVCjvcRNVD0xNI10j",
      description: "Gentle piano melodies to calm anxious thoughts"
    },
    {
      name: "Gymnopédie No.1",
      artist: "Erik Satie",
      id: "5NGtFXVpXSvwunEIGeviY3",
      description: "A peaceful, meditative piece to slow racing thoughts"
    }
  ],
  'stressed': [
    {
      name: "Horizon Variations",
      artist: "Max Richter",
      id: "3G3xH5CXjIrMDV9j3B3uRd",
      description: "Minimalist composition to reduce stress levels"
    },
    {
      name: "All of Me",
      artist: "Jon Schmidt",
      id: "4JJCk26zUJSlZYl5BVYmRb",
      description: "Beautiful piano to release tension"
    },
    {
      name: "Watermark",
      artist: "Enya",
      id: "0W4Q442O0iHZgKNtOSOY7y",
      description: "Ethereal soundscapes for stress relief"
    }
  ],
  'calm': [
    {
      name: "Experience",
      artist: "Ludovico Einaudi",
      id: "1BncfTJAWxrsxyT9culBrj",
      description: "Serene piano composition to enhance your peaceful state"
    },
    {
      name: "Holocene",
      artist: "Bon Iver",
      id: "3jG4MuRRvFBGUQcuBzrXl4",
      description: "Atmospheric folk to maintain your calm"
    },
    {
      name: "Ocean",
      artist: "John Butler",
      id: "6nWRMP5hhvhrPkR57kzJ0I",
      description: "Intricate acoustic guitar patterns for mindfulness"
    }
  ],
  'neutral': [
    {
      name: "Gymnopédie No.1",
      artist: "Erik Satie",
      id: "5NGtFXVpXSvwunEIGeviY3",
      description: "A peaceful, contemplative piano piece to inspire reflection"
    },
    {
      name: "Intro",
      artist: "The xx",
      id: "0J80S4nCD5XhI40J8ulZwE",
      description: "A minimalist track perfect for focus and mindfulness"
    },
    {
      name: "Both Sides Now",
      artist: "Joni Mitchell",
      id: "2JPCO3NkHJFmKSI2Qo42GO",
      description: "A thoughtful reflection on perspective"
    }
  ],
  'unknown': [
    {
      name: "Here Comes the Sun",
      artist: "The Beatles",
      id: "6dGnYIeXmHdcikdzNNDMm2",
      description: "A gentle reminder that things are looking up"
    },
    {
      name: "What a Wonderful World",
      artist: "Louis Armstrong",
      id: "29U7stRjqHU6rMiS8BfaI9",
      description: "A classic celebration of life's simple beauties"
    },
    {
      name: "Somewhere Over the Rainbow",
      artist: "Israel Kamakawiwoʻole",
      id: "1PmXm1881bonBI1AlG5uaH",
      description: "A hopeful ukulele rendition of the timeless classic"
    }
  ]
};

// Function to get a random recommendation from the fallback list
const getRandomRecommendation = (mood: Mood): SpotifyRecommendation => {
  const recommendations = fallbackRecommendations[mood] || fallbackRecommendations.neutral;
  const randomIndex = Math.floor(Math.random() * recommendations.length);
  return recommendations[randomIndex];
};

// Spotify API integration for dynamic music recommendations
export const getSpotifyRecommendation = async (mood: Mood, apiKey?: string): Promise<SpotifyRecommendation> => {
  try {
    // Check if we have a Spotify API key
    if (apiKey) {
      // Map moods to Spotify audio features for recommendations
      const moodFeatures: Record<Mood, { valence: number, energy: number, tempo?: number }> = {
        happy: { valence: 0.8, energy: 0.8 },
        sad: { valence: 0.2, energy: 0.3 },
        angry: { valence: 0.3, energy: 0.9 },
        anxious: { valence: 0.4, energy: 0.3, tempo: 80 },
        stressed: { valence: 0.3, energy: 0.2, tempo: 70 },
        calm: { valence: 0.6, energy: 0.2, tempo: 85 },
        neutral: { valence: 0.5, energy: 0.5 },
        unknown: { valence: 0.6, energy: 0.6 }
      };
      
      const features = moodFeatures[mood] || moodFeatures.neutral;
      
      // Make Spotify API request for recommendations
      // This is a placeholder for the real API call implementation
      // NOTE: In a real implementation, this should be done server-side to protect API keys
      const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=1&seed_genres=pop&target_valence=${features.valence}&target_energy=${features.energy}${features.tempo ? `&target_tempo=${features.tempo}` : ''}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.tracks && data.tracks.length > 0) {
          const track = data.tracks[0];
          return {
            name: track.name,
            artist: track.artists.map((a: any) => a.name).join(', '),
            id: track.id,
            description: `${mood === 'happy' ? 'An uplifting' : mood === 'sad' ? 'A comforting' : 'A helpful'} track to match your current mood`
          };
        }
      }
    }
    
    // Fallback to hardcoded recommendations
    // Simulate API delay for consistency
    await new Promise(resolve => setTimeout(resolve, 500));
    return getRandomRecommendation(mood);
  } catch (error) {
    console.error('Error fetching Spotify recommendations:', error);
    return getRandomRecommendation(mood);
  }
};

// Track user preferences for machine learning simulation
const trackPreference = (mood: Mood, recommendationType: 'music' | 'movie' | 'book' | 'destination'): void => {
  try {
    // Get existing preferences or initialize new ones
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    
    // Initialize mood preferences if they don't exist
    if (!preferences[mood]) {
      preferences[mood] = {
        music: 0,
        movie: 0,
        book: 0,
        destination: 0
      };
    }
    
    // Increment the preference count
    preferences[mood][recommendationType]++;
    
    // Save back to localStorage
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  } catch (error) {
    console.error('Error tracking user preference:', error);
  }
};

// Get user preferences to weight recommendations (simulating ML)
export const getUserPreferences = (mood: Mood): Record<string, number> => {
  try {
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    return preferences[mood] || { music: 0, movie: 0, book: 0, destination: 0 };
  } catch (error) {
    console.error('Error getting user preferences:', error);
    return { music: 0, movie: 0, book: 0, destination: 0 };
  }
};

// Record that user viewed or selected a recommendation
export const recordRecommendationInteraction = (mood: Mood, type: 'music' | 'movie' | 'book' | 'destination'): void => {
  trackPreference(mood, type);
};
