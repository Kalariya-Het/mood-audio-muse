
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/hooks/useTheme';

const DarkModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-full hover:bg-mindmosaic-light-purple hover:text-mindmosaic-purple transition-all duration-300"
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-yellow-300 hover:text-yellow-400 transition-colors" />
      ) : (
        <Moon size={18} className="text-mindmosaic-dark-purple hover:text-mindmosaic-purple transition-colors" />
      )}
    </Button>
  );
};

export default DarkModeToggle;
