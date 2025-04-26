
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';

interface EmergencySupportProps {
  mood: 'sad' | 'anxious' | 'stressed' | string;
}

const EmergencySupport: React.FC<EmergencySupportProps> = ({ mood }) => {
  // Only show for certain moods
  if (!['sad', 'anxious', 'stressed'].includes(mood)) {
    return null;
  }

  return (
    <Card className="mt-4 bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-red-600 dark:text-red-400 shrink-0 mt-1" size={20} />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
              Need to talk to someone?
            </h3>
            
            <p className="text-sm text-red-700 dark:text-red-200 mb-3">
              {mood === 'sad' 
                ? "It's okay to not feel okay. If you're struggling, please consider reaching out for support."
                : mood === 'anxious'
                ? "Anxiety can be overwhelming. Professional support is available when you need it."
                : "Chronic stress can affect your wellbeing. Don't hesitate to seek help if you need it."}
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-red-600 dark:text-red-400" />
                <p className="font-medium">National Suicide Prevention Lifeline: <a href="tel:1-800-273-8255" className="underline">1-800-273-8255</a></p>
              </div>
              
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className="text-red-600 dark:text-red-400" />
                <p className="font-medium">Crisis Text Line: Text HOME to <span className="font-bold">741741</span></p>
              </div>
              
              <p className="text-xs text-red-600 dark:text-red-300 mt-2">
                These services are available 24/7 and are free and confidential.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencySupport;
