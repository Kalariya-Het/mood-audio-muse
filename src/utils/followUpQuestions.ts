
import { FollowUpQuestion, Mood } from '@/types';

export const followUpQuestions: FollowUpQuestion[] = [
  {
    mood: 'happy',
    questions: [
      "What's contributing to your happiness today?",
      "What activities make you feel this positive?",
      "How can you maintain this positive energy?"
    ]
  },
  {
    mood: 'sad',
    questions: [
      "What's been making you feel down lately?",
      "Is there something specific troubling you?",
      "Have you talked to anyone about how you're feeling?"
    ]
  },
  {
    mood: 'angry',
    questions: [
      "What's triggering your frustration?",
      "Is there a way to address what's bothering you?",
      "What usually helps you calm down when you feel this way?"
    ]
  },
  {
    mood: 'anxious',
    questions: [
      "What's causing you to feel anxious right now?",
      "Are you worried about something specific?",
      "What techniques have helped with your anxiety before?"
    ]
  },
  {
    mood: 'stressed',
    questions: [
      "What's been stressing you out?",
      "How are you managing your stress levels?",
      "Is there anything you could delegate or let go of?"
    ]
  },
  {
    mood: 'calm',
    questions: [
      "What's helping you feel centered today?",
      "What practices keep you feeling balanced?",
      "How can you bring more of this calm into other areas of your life?"
    ]
  },
  {
    mood: 'neutral',
    questions: [
      "How has your day been going so far?",
      "Is there anything you're looking forward to?",
      "What would make today more meaningful for you?"
    ]
  }
];

export const getRandomFollowUpQuestion = (mood: Mood): string => {
  const moodQuestions = followUpQuestions.find(q => q.mood === mood);
  if (!moodQuestions) {
    return "How are you feeling about that?";
  }
  
  const randomIndex = Math.floor(Math.random() * moodQuestions.questions.length);
  return moodQuestions.questions[randomIndex];
};

export const getFollowUpQuestions = (mood: Mood, count: number = 1): string[] => {
  const moodQuestions = followUpQuestions.find(q => q.mood === mood);
  if (!moodQuestions || moodQuestions.questions.length === 0) {
    return ["How are you feeling about that?"];
  }
  
  // Shuffle the questions
  const shuffled = [...moodQuestions.questions].sort(() => 0.5 - Math.random());
  
  // Get the requested number of questions, or all if there are fewer than requested
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
