
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Recommendation, Mood } from '@/types';
import { getMoodEmoji } from '@/utils/moodDetection';

interface RecommendationsCardProps {
  recommendations: {
    music: Recommendation;
    movie: Recommendation;
    book: Recommendation;
    destination: Recommendation;
    mindfulActivity: string;
    emergencySupport?: string;
  };
  mood: Mood;
}

const RecommendationsCard: React.FC<RecommendationsCardProps> = ({ recommendations, mood }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-soft border-mindmosaic-light-purple animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">{getMoodEmoji(mood)}</span>
          <h3 className="text-lg font-semibold text-mindmosaic-dark-purple">
            Personalized Recommendations
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="recommendation">
            <h4 className="font-medium text-mindmosaic-purple">Music</h4>
            <p className="text-sm font-medium">{recommendations.music.title}</p>
            <p className="text-xs text-gray-600">{recommendations.music.description}</p>
          </div>
          
          <div className="recommendation">
            <h4 className="font-medium text-mindmosaic-purple">Movie</h4>
            <p className="text-sm font-medium">{recommendations.movie.title}</p>
            <p className="text-xs text-gray-600">{recommendations.movie.description}</p>
          </div>
          
          <div className="recommendation">
            <h4 className="font-medium text-mindmosaic-purple">Book</h4>
            <p className="text-sm font-medium">{recommendations.book.title}</p>
            <p className="text-xs text-gray-600">{recommendations.book.description}</p>
          </div>
          
          <div className="recommendation">
            <h4 className="font-medium text-mindmosaic-purple">Place to Visit</h4>
            <p className="text-sm font-medium">{recommendations.destination.title}</p>
            <p className="text-xs text-gray-600">{recommendations.destination.description}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="mindful-activity">
            <h4 className="font-medium text-mindmosaic-dark-purple">Mindful Activity</h4>
            <p className="text-sm">{recommendations.mindfulActivity}</p>
          </div>
          
          {recommendations.emergencySupport && (
            <div className="emergency-support">
              <h4 className="font-medium text-red-800">Emergency Support</h4>
              <p className="text-sm">{recommendations.emergencySupport}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsCard;
