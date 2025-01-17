import { createContext } from 'react';

// Theme configuration
export const themes = {
  light: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    text: '#2d3748',
    accent: '#3b82f6',
    muted: '#718096',
    border: '#e2e8f0',
    card: '#ffffff',
    background: '#f8f9fa'
  },
  dark: {
    primary: '#1a202c',
    secondary: '#2d3748',
    text: '#f7fafc',
    accent: '#4299e1',
    muted: '#a0aec0',
    border: '#4a5568',
    card: '#2d3748',
    background: '#1a202c'
  }
};

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});