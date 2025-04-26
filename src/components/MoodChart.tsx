
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MoodRecord, Mood } from '@/types';
import { getMoodEmoji } from '@/utils/moodDetection';

interface MoodChartProps {
  moodHistory: MoodRecord[];
}

const moodToValue = (mood: Mood): number => {
  switch(mood) {
    case 'happy': return 4;
    case 'neutral': return 3;
    case 'sad': return 2;
    case 'angry': return 1;
    default: return 0;
  }
};

const valueToMood = (value: number): Mood => {
  switch(Math.round(value)) {
    case 4: return 'happy';
    case 3: return 'neutral';
    case 2: return 'sad';
    case 1: return 'angry';
    default: return 'unknown';
  }
};

const MoodChart: React.FC<MoodChartProps> = ({ moodHistory }) => {
  // Format data for chart
  const chartData = moodHistory.map(record => ({
    date: new Date(record.timestamp).toLocaleDateString(),
    value: moodToValue(record.mood),
    mood: record.mood
  }));

  // Custom tooltip to show mood emoji instead of raw value
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const mood = payload[0].payload.mood;
      return (
        <div className="bg-white dark:bg-mindmosaic-dark-gray p-2 rounded-md shadow-sm border border-mindmosaic-light-purple">
          <p className="text-sm">{payload[0].payload.date}</p>
          <p className="text-xl">{getMoodEmoji(mood)}</p>
        </div>
      );
    }
    return null;
  };

  if (moodHistory.length < 2) {
    return (
      <Card className="mt-4 bg-white/80 dark:bg-mindmosaic-dark-gray/80 backdrop-blur-sm border-mindmosaic-light-purple">
        <CardContent className="p-4">
          <p className="text-center text-mindmosaic-gray dark:text-white/70">
            Not enough data to show mood trends yet. Keep chatting!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4 bg-white/80 dark:bg-mindmosaic-dark-gray/80 backdrop-blur-sm border-mindmosaic-light-purple">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-mindmosaic-dark-purple dark:text-mindmosaic-light-purple mb-2">
          Your Mood History
        </h3>
        
        <div className="h-[200px] w-full">
          <ChartContainer 
            config={{ 
              line: { 
                theme: { 
                  light: "#9b87f5", 
                  dark: "#E5DEFF" 
                } 
              } 
            }}
          >
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }} 
                tickMargin={10}
              />
              <YAxis 
                domain={[0, 5]} 
                ticks={[1, 2, 3, 4]} 
                tickFormatter={(value) => {
                  const mood = valueToMood(value);
                  return getMoodEmoji(mood);
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-line)"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChart;
