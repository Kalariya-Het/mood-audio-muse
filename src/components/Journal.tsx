
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Mood, JournalEntry } from '@/types';
import { getMoodEmoji } from '@/utils/moodDetection';
import { v4 as uuidv4 } from 'uuid';
import { Book, Save, X } from 'lucide-react';
import { useJournal } from '@/hooks/useJournal';

interface JournalProps {
  currentMood: Mood;
}

const journalPrompts: Record<Mood, string[]> = {
  'happy': [
    'What made you smile today?',
    'What are you grateful for right now?',
    'How can you extend this positive feeling to tomorrow?'
  ],
  'sad': [
    'What emotions are present for you right now?',
    'What would offer you comfort in this moment?',
    'What\'s one small step you could take toward feeling better?'
  ],
  'angry': [
    'What triggered this feeling?',
    'What needs of yours aren\'t being met?',
    'What would help you feel more at peace right now?'
  ],
  'neutral': [
    'What are you looking forward to today or tomorrow?',
    'What\'s something you\'d like to explore or learn about?',
    'How would you describe your energy levels right now?'
  ],
  'anxious': [
    'What specifically is causing your anxiety right now?',
    'What has helped calm your anxiety in the past?',
    'What would help you feel more grounded in this moment?'
  ],
  'stressed': [
    'What pressures are you feeling right now?',
    'What boundaries might you need to set?',
    'What small action could help reduce your stress level?'
  ],
  'calm': [
    'What contributed to this sense of calm?',
    'How can you bring more of this feeling into your daily life?',
    'What are you appreciating about this peaceful moment?'
  ],
  'unknown': [
    'How are you feeling right now?',
    'What\'s on your mind today?',
    'What would make today meaningful for you?'
  ]
};

const Journal: React.FC<JournalProps> = ({ currentMood }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [entry, setEntry] = useState('');
  const [showEntries, setShowEntries] = useState(false);
  const { entries, addEntry, deleteEntry } = useJournal();

  // Generate a random prompt when mood changes or when journal opens
  useEffect(() => {
    if (isOpen) {
      const moodPrompts = journalPrompts[currentMood] || journalPrompts.neutral;
      const randomIndex = Math.floor(Math.random() * moodPrompts.length);
      setPrompt(moodPrompts[randomIndex]);
    }
  }, [currentMood, isOpen]);

  const handleSave = () => {
    if (entry.trim()) {
      const newEntry: JournalEntry = {
        id: uuidv4(),
        text: entry,
        mood: currentMood,
        timestamp: new Date()
      };
      
      addEntry(newEntry);
      setEntry('');
      setIsOpen(false);
    }
  };

  const toggleJournal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowEntries(false);
    }
  };

  const toggleEntries = () => {
    setShowEntries(!showEntries);
    if (showEntries) {
      setIsOpen(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex gap-2 justify-center">
        <Button 
          onClick={toggleJournal}
          variant={isOpen ? "secondary" : "outline"}
          className="border-mindmosaic-purple text-mindmosaic-dark-purple hover:bg-mindmosaic-light-purple dark:text-white dark:border-mindmosaic-light-purple"
        >
          <Book size={18} className="mr-2" />
          {isOpen ? "Close Journal" : "Open Journal"}
        </Button>
        
        <Button 
          onClick={toggleEntries}
          variant={showEntries ? "secondary" : "outline"}
          className="border-mindmosaic-purple text-mindmosaic-dark-purple hover:bg-mindmosaic-light-purple dark:text-white dark:border-mindmosaic-light-purple"
          disabled={entries.length === 0}
        >
          {showEntries ? "Hide Entries" : "View Past Entries"}
        </Button>
      </div>
      
      {isOpen && (
        <Card className="mt-2 bg-white/80 dark:bg-mindmosaic-dark-gray/80 backdrop-blur-sm border-mindmosaic-light-purple animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{getMoodEmoji(currentMood)}</span>
                <h3 className="text-lg font-semibold text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple">
                  Journal Entry
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="rounded-full hover:bg-mindmosaic-light-purple hover:text-mindmosaic-purple -mt-2 -mr-2"
              >
                <X size={18} />
              </Button>
            </div>
            
            <p className="text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple mb-3 italic">
              {prompt}
            </p>
            
            <Textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="Start writing here..."
              className="min-h-[120px] resize-none bg-white dark:bg-mindmosaic-dark-gray border-mindmosaic-light-purple"
              aria-label="Journal entry"
            />
            
            <div className="flex justify-end mt-3">
              <Button 
                onClick={handleSave}
                className="bg-mindmosaic-purple hover:bg-mindmosaic-dark-purple"
                disabled={!entry.trim()}
              >
                <Save size={16} className="mr-1" />
                Save Entry
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {showEntries && entries.length > 0 && (
        <Card className="mt-2 bg-white/80 dark:bg-mindmosaic-dark-gray/80 backdrop-blur-sm border-mindmosaic-light-purple animate-fade-in">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple mb-3">
              Your Journal Entries
            </h3>
            
            <div className="max-h-[300px] overflow-y-auto space-y-3">
              {entries.slice().reverse().map(entry => (
                <div 
                  key={entry.id} 
                  className="p-3 border border-mindmosaic-light-purple rounded-md bg-white/70 dark:bg-mindmosaic-dark-gray/70"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span>{getMoodEmoji(entry.mood)}</span>
                      <span className="text-xs text-mindmosaic-gray dark:text-mindmosaic-light-purple">
                        {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-mindmosaic-dark-gray dark:text-white/90">{entry.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Journal;
