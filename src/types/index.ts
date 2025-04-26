
export type Mood = 'happy' | 'sad' | 'angry' | 'neutral' | 'anxious' | 'stressed' | 'calm' | 'unknown';

export interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  audio?: string;
  followUpQuestions?: string[];
}

export interface Recommendation {
  type: 'music' | 'movie' | 'book' | 'destination';
  title: string;
  description: string;
  spotifyId?: string; // Added for Spotify integration
}

export interface MoodRecommendations {
  music: Recommendation;
  movie: Recommendation;
  book: Recommendation;
  destination: Recommendation;
  mindfulActivity: string;
  emergencySupport?: string;
  meditationScript: string;
}

export interface Tip {
  id: string;
  text: string;
  timestamp: Date;
  likes?: number; // Added for the like system
  likedBy?: string[]; // Added to track who liked each tip
  location?: {
    latitude: number;
    longitude: number;
    locationName?: string;
  };
}

export interface JournalEntry {
  id: string;
  text: string;
  mood: Mood;
  timestamp: Date;
}

export interface MoodRecord {
  mood: Mood;
  timestamp: Date;
}

// For dark mode
export type Theme = 'light' | 'dark';

// For dynamic follow-up questions
export interface FollowUpQuestion {
  mood: Mood;
  questions: string[];
}
