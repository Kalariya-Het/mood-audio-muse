
export type Mood = 'happy' | 'sad' | 'angry' | 'neutral' | 'unknown';

export interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  audio?: string;
}

export interface Recommendation {
  type: 'music' | 'movie' | 'book' | 'destination';
  title: string;
  description: string;
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
}
