// context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const themeStyles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#000000',
      borderColor: '#ddd'
    },
    dark: {
      backgroundColor: '#333333',
      color: '#ffffff',
      borderColor: '#555'
    }
  };

  const value = {
    theme,
    toggleTheme,
    themeStyles: themeStyles[theme]
  };

  return (
    <ThemeContext.Provider value={value}>
      <div style={{
        backgroundColor: themeStyles[theme].backgroundColor,
        color: themeStyles[theme].color,
        minHeight: '100vh',
        transition: 'all 0.3s ease'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;