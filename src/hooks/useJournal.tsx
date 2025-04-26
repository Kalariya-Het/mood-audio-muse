
import { useState, useEffect } from 'react';
import { JournalEntry } from '@/types';

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Load journal entries from localStorage
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        const parsed = JSON.parse(savedEntries);
        setEntries(parsed.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        })));
      } catch (e) {
        console.error('Error parsing journal entries:', e);
      }
    }
  }, []);

  // Save new entry
  const addEntry = (entry: JournalEntry) => {
    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    return updatedEntries;
  };

  // Delete an entry
  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    return updatedEntries;
  };

  return {
    entries,
    addEntry,
    deleteEntry
  };
};
