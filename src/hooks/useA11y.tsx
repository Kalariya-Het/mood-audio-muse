
import { useEffect } from 'react';

interface A11yOptions {
  trapFocus?: boolean;
  announcePageChanges?: boolean;
  enableKeyboardShortcuts?: boolean;
}

export const useA11y = (options: A11yOptions = {}) => {
  const {
    trapFocus = false,
    announcePageChanges = true,
    enableKeyboardShortcuts = true
  } = options;

  // Add screen reader announcements
  useEffect(() => {
    if (announcePageChanges) {
      // Create a screen reader announcement element if it doesn't exist
      let announcerElement = document.getElementById('screen-reader-announcer');
      if (!announcerElement) {
        announcerElement = document.createElement('div');
        announcerElement.id = 'screen-reader-announcer';
        announcerElement.setAttribute('aria-live', 'polite');
        announcerElement.setAttribute('aria-atomic', 'true');
        announcerElement.className = 'sr-only'; // Screen reader only
        document.body.appendChild(announcerElement);
      }
    }

    return () => {
      if (announcePageChanges) {
        const element = document.getElementById('screen-reader-announcer');
        if (element) {
          element.remove();
        }
      }
    };
  }, [announcePageChanges]);

  // Handle focus trapping for modals and dialogs
  useEffect(() => {
    if (!trapFocus) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        // If shift + tab and on first element, move to last
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        // If tab and on last element, move to first
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [trapFocus]);

  // Add keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Example shortcuts
      switch (e.key.toLowerCase()) {
        case 'd':
          if (e.altKey) {
            // Alt+D to toggle dark mode
            const darkModeToggle = document.querySelector('[aria-label="Toggle dark mode"]') as HTMLButtonElement;
            if (darkModeToggle) {
              darkModeToggle.click();
              e.preventDefault();
            }
          }
          break;
        case 'h':
          if (e.altKey) {
            // Alt+H to go home
            const homeLink = document.querySelector('[aria-label="Go to home"]') as HTMLAnchorElement;
            if (homeLink) {
              homeLink.click();
              e.preventDefault();
            }
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcuts);
    };
  }, [enableKeyboardShortcuts]);

  // Announce a message to screen readers
  const announce = (message: string) => {
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      announcer.textContent = message;
    }
  };

  return { announce };
};

export default useA11y;
