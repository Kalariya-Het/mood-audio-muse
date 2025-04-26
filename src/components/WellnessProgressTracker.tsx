
import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MoodRecord, Mood } from '@/types';
import { getMoodEmoji } from '@/utils/moodDetection';
import { Progress } from "@/components/ui/progress";
import { Sparkles } from 'lucide-react';

interface WellnessProgressTrackerProps {
  moodHistory: MoodRecord[];
}

const WellnessProgressTracker: React.FC<WellnessProgressTrackerProps> = ({ moodHistory }) => {
  const moodScore = useMemo(() => {
    if (moodHistory.length < 2) return { score: 50, trend: 'neutral' as Mood };
    
    // Calculate mood scores (higher is better)
    const moodScores: Record<Mood, number> = {
      'happy': 100,
      'calm': 80,
      'neutral': 50,
      'anxious': 30,
      'stressed': 20,
      'sad': 10,
      'angry': 0,
      'unknown': 50
    };
    
    // Get recent moods (last 5 or less)
    const recentMoods = moodHistory
      .slice(-5)
      .map(record => ({
        ...record,
        score: moodScores[record.mood] || 50
      }));
    
    // Calculate average score
    const totalScore = recentMoods.reduce((sum, record) => sum + record.score, 0);
    const averageScore = Math.round(totalScore / recentMoods.length);
    
    // Determine trend (are we improving?)
    if (recentMoods.length >= 3) {
      const oldAvg = (recentMoods[0].score + recentMoods[1].score) / 2;
      const newAvg = (recentMoods[recentMoods.length - 2].score + recentMoods[recentMoods.length - 1].score) / 2;
      
      if (newAvg - oldAvg > 15) return { score: averageScore, trend: 'happy' as Mood };
      if (newAvg - oldAvg > 5) return { score: averageScore, trend: 'calm' as Mood };
      if (oldAvg - newAvg > 15) return { score: averageScore, trend: 'sad' as Mood };
      if (oldAvg - newAvg > 5) return { score: averageScore, trend: 'anxious' as Mood };
    }
    
    return { score: averageScore, trend: 'neutral' as Mood };
  }, [moodHistory]);
  
  // Generate a wellness message based on score and trend
  const wellnessMessage = useMemo(() => {
    if (moodHistory.length < 3) {
      return "Keep checking in to track your wellness journey.";
    }
    
    if (moodScore.score >= 80) {
      return "You've been feeling great lately! Keep up the positive momentum.";
    } else if (moodScore.score >= 60) {
      return "You're doing well! Your mood has been generally positive.";
    } else if (moodScore.score >= 40) {
      return "Your mood has been balanced lately. Remember to practice self-care.";
    } else if (moodScore.score >= 20) {
      return "You've been facing some challenges. Consider trying a mindful activity.";
    } else {
      return "You've been going through a tough time. Remember that it's okay to seek support.";
    }
  }, [moodScore.score, moodHistory.length]);
  
  if (moodHistory.length < 2) {
    return null;
  }
  
  return (
    <Card className="mt-4 bg-white/80 dark:bg-mindmosaic-dark-gray/80 backdrop-blur-sm border-mindmosaic-light-purple">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple">
            Your Wellness Progress
          </h3>
          <Sparkles size={18} className="text-mindmosaic-purple dark:text-mindmosaic-light-purple" />
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">Wellness Score</span>
            <div className="flex items-center">
              <span className="text-lg mr-2">{getMoodEmoji(moodScore.trend)}</span>
              <span className="font-bold">{moodScore.score}/100</span>
            </div>
          </div>
          <Progress value={moodScore.score} className="h-2 bg-gray-200 dark:bg-gray-700" />
        </div>
        
        <p className="text-sm text-mindmosaic-dark-purple dark:text-white/90">
          {wellnessMessage}
        </p>
        
        <div className="mt-3 pt-3 border-t border-mindmosaic-light-purple/30 text-xs text-gray-600 dark:text-gray-300">
          Based on your last {Math.min(moodHistory.length, 5)} check-ins
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessProgressTracker;
