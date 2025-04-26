
import { Mood, MoodRecommendations } from '@/types';

export const getMoodRecommendations = (mood: Mood): MoodRecommendations => {
  switch (mood) {
    case 'happy':
      return {
        music: {
          type: 'music',
          title: 'Walking on Sunshine by Katrina and The Waves',
          description: 'An upbeat classic to amplify your positive mood'
        },
        movie: {
          type: 'movie',
          title: 'La La Land',
          description: 'A colorful musical celebration of joy and dreams'
        },
        book: {
          type: 'book',
          title: 'The Alchemist by Paulo Coelho',
          description: 'An inspiring tale about following your dreams'
        },
        destination: {
          type: 'destination',
          title: 'Local Park or Garden',
          description: 'Enjoy the sunshine and natural beauty around you'
        },
        mindfulActivity: "Try a gratitude journal: Write down 3 things you're grateful for today. This can help maintain your positive momentum.",
        meditationScript: "Welcome to your happiness meditation. Find a comfortable position and gently close your eyes. Take a deep breath in... and slowly exhale. Notice the joy that's present within you right now. With each breath, let that joy expand through your entire body. Imagine a warm, golden light filling your chest and spreading to your limbs. This is your natural state of happiness. As you breathe, silently repeat to yourself: 'I welcome joy, I am grateful.' Take a moment to recall something that brought you happiness today, no matter how small. Feel that moment again. When you're ready, gently open your eyes, carrying this feeling of joy with you."
      };
    case 'sad':
      return {
        music: {
          type: 'music',
          title: 'Clair de Lune by Claude Debussy',
          description: 'A gentle, soothing piano piece to comfort you'
        },
        movie: {
          type: 'movie',
          title: 'Inside Out',
          description: 'A thoughtful exploration of emotions and their importance'
        },
        book: {
          type: 'book',
          title: 'The Little Prince by Antoine de Saint-Exupéry',
          description: 'A heartwarming story with profound insights'
        },
        destination: {
          type: 'destination',
          title: 'Cozy Local Café',
          description: 'A warm environment to enjoy a soothing cup of tea'
        },
        mindfulActivity: "Try a 5-minute deep breathing exercise: Inhale for 4 seconds, hold for 2, and exhale for 6. This can help calm your nervous system and create space for healing.",
        emergencySupport: "If you're feeling overwhelmed, consider reaching out to 1-800-273-8255 (US National Suicide Prevention Lifeline). Remember that it's okay to ask for help.",
        meditationScript: "Welcome to your compassion meditation. Find a comfortable position and let your eyes gently close. Take a slow breath in... and release it fully. Place a hand over your heart and feel its steady rhythm. Acknowledge any sadness you're experiencing without judgment - all emotions are valid messengers. As you breathe, imagine each exhale carrying away a small piece of heaviness. With each inhale, visualize yourself surrounded by a soft, blue healing light. Say to yourself gently: 'May I be kind to myself in this moment.' Remember that this feeling, like all feelings, will eventually pass. You are not alone in experiencing sadness. When you're ready, slowly open your eyes, knowing you've given yourself this moment of care."
      };
    case 'angry':
      return {
        music: {
          type: 'music',
          title: 'Weightless by Marconi Union',
          description: 'Scientifically designed to reduce stress and anxiety'
        },
        movie: {
          type: 'movie',
          title: 'The Secret Life of Walter Mitty',
          description: 'An uplifting adventure about escaping daily frustrations'
        },
        book: {
          type: 'book',
          title: 'Practicing Peace in Times of War by Pema Chödrön',
          description: 'Insights on transforming anger into understanding'
        },
        destination: {
          type: 'destination',
          title: 'Local Nature Trail',
          description: 'A quiet place to walk and process your thoughts'
        },
        mindfulActivity: "Try the 5-4-3-2-1 grounding technique: Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This can help bring you back to the present moment.",
        emergencySupport: "If you're feeling overwhelmed by anger, consider stepping away from the situation temporarily or calling a trusted friend. For immediate support, text HOME to 741741 to reach the Crisis Text Line.",
        meditationScript: "Welcome to your calming meditation. Find a position where you feel stable and grounded. Take a deep breath in... and exhale completely. Notice any tension you might be holding, particularly in your jaw, shoulders, or hands. With each exhale, release that tension. Visualize a peaceful scene—perhaps waves gently meeting the shore. As thoughts arise, acknowledge them without judgment, then return to your breath. Place your awareness on your feet or sitting bones, feeling the solid support beneath you. Say to yourself: 'I am safe, I am grounded.' Continue breathing deeply, allowing your heart rate to slow. When ready, gently open your eyes, carrying this sense of calm with you."
      };
    case 'neutral':
    default:
      return {
        music: {
          type: 'music',
          title: 'Gymnopédie No.1 by Erik Satie',
          description: 'A peaceful, contemplative piano piece to inspire reflection'
        },
        movie: {
          type: 'movie',
          title: 'Soul',
          description: 'A beautiful exploration of purpose and appreciation for life'
        },
        book: {
          type: 'book',
          title: 'Essentialism by Greg McKeown',
          description: 'Insights on focusing on what truly matters'
        },
        destination: {
          type: 'destination',
          title: 'Local Bookstore or Library',
          description: 'A quiet place to discover new ideas and perspectives'
        },
        mindfulActivity: "Try a mindful observation exercise: Choose an object and spend 2 minutes examining it as if seeing it for the first time. Notice its colors, textures, and details. This can help cultivate present-moment awareness.",
        meditationScript: "Welcome to your mindfulness meditation. Find a comfortable seated position and allow your eyes to softly close. Begin with three deep breaths... in through your nose... and out through your mouth. Now let your breathing return to its natural rhythm. Bring your attention to the sensation of your breath—perhaps at your nostrils, chest, or abdomen. When your mind wanders, gently guide it back to your breath without judgment. Each moment is an opportunity to begin again. Notice the quality of your awareness right now—not trying to change anything, just observing. As you continue breathing, silently note 'in' with each inhale and 'out' with each exhale. When you're ready, slowly open your eyes, carrying this awareness into the rest of your day."
      };
  }
};

export const generateResponse = (mood: Mood, username: string = ''): string => {
  const greeting = username ? `${username}, I` : 'I';
  
  switch (mood) {
    case 'happy':
      return `${greeting} sense you're feeling happy today! That's wonderful. It's important to savor these positive moments.`;
    case 'sad':
      return `${greeting} sense you're feeling sad. I'm here for you. Remember that it's okay to not feel okay sometimes.`;
    case 'angry':
      return `${greeting} sense you're feeling frustrated or angry. Taking a moment to breathe can really help when emotions are intense.`;
    case 'neutral':
      return `${greeting} sense you're feeling okay today. Sometimes a neutral state is a great foundation for mindfulness.`;
    default:
      return `${greeting}'d like to understand how you're feeling better. Could you tell me more about your day?`;
  }
};
