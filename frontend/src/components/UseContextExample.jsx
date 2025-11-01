// components/UseContextExample.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemedBox = ({ title, children }) => {
  const { themeStyles } = useTheme();
  
  return (
    <div style={{
      ...themeStyles,
      padding: '20px',
      margin: '10px 0',
      border: `2px solid ${themeStyles.borderColor}`,
      borderRadius: '8px'
    }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

const UserProfile = () => {
  const { themeStyles } = useTheme();
  
  return (
    <ThemedBox title="User Profile">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: themeStyles.theme === 'light' ? '#61dafb' : '#21a1c4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          JD
        </div>
        <div>
          <h4 style={{ margin: 0 }}>John Doe</h4>
          <p style={{ margin: 0, opacity: 0.8 }}>john.doe@example.com</p>
          <p style={{ margin: 0, opacity: 0.6 }}>Theme: {themeStyles.theme}</p>
        </div>
      </div>
    </ThemedBox>
  );
};

const SettingsPanel = () => {
  const { theme, toggleTheme, themeStyles } = useTheme();

  return (
    <ThemedBox title="Settings Panel">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Current Theme: <strong>{theme}</strong></span>
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            padding: '10px',
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            border: `2px solid ${theme === 'light' ? '#61dafb' : '#21a1c4'}`,
            borderRadius: '4px',
            flex: 1,
            minWidth: '120px'
          }}>
            <h5 style={{ margin: 0 }}>Background</h5>
            <p style={{ margin: 0, fontSize: '12px' }}>{themeStyles.backgroundColor}</p>
          </div>
          
          <div style={{
            padding: '10px',
            backgroundColor: theme === 'light' ? '#fff' : '#333',
            border: `2px solid ${theme === 'light' ? '#61dafb' : '#21a1c4'}`,
            borderRadius: '4px',
            flex: 1,
            minWidth: '120px'
          }}>
            <h5 style={{ margin: 0 }}>Text Color</h5>
            <p style={{ margin: 0, fontSize: '12px' }}>{themeStyles.color}</p>
          </div>
        </div>
      </div>
    </ThemedBox>
  );
};

const Notification = ({ type = 'info', message }) => {
  const { theme } = useTheme();
  
  const getNotificationStyle = () => {
    const baseStyle = {
      padding: '10px 15px',
      borderRadius: '4px',
      margin: '5px 0',
      borderLeft: `4px solid`
    };
    
    const colors = {
      info: theme === 'light' ? '#61dafb' : '#21a1c4',
      success: theme === 'light' ? '#4CAF50' : '#45a049',
      warning: theme === 'light' ? '#ff9800' : '#e68a00',
      error: theme === 'light' ? '#f44336' : '#da190b'
    };
    
    return {
      ...baseStyle,
      backgroundColor: theme === 'light' ? '#f8f9fa' : '#444',
      borderLeftColor: colors[type]
    };
  };

  return (
    <div style={getNotificationStyle()}>
      <strong>{type.toUpperCase()}:</strong> {message}
    </div>
  );
};

const UseContextExample = () => {
  const { theme, themeStyles } = useTheme();

  return (
    <div className="hook-example" style={themeStyles}>
      <h2>useContext Hook</h2>
      <p>
        The useContext hook allows you to consume context values without prop drilling. 
        Multiple components can access the same theme context.
      </p>

      <UserProfile />
      <SettingsPanel />

      <ThemedBox title="Notifications Example">
        <Notification type="info" message="This is an information message" />
        <Notification type="success" message="Operation completed successfully" />
        <Notification type="warning" message="This is a warning message" />
        <Notification type="error" message="An error occurred" />
      </ThemedBox>

      <ThemedBox title="Theme Information">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <h4 style={{ margin: 0 }}>Current Theme</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{theme}</p>
          </div>
          <div>
            <h4 style={{ margin: 0 }}>Background Color</h4>
            <p style={{ margin: 0, fontFamily: 'monospace' }}>{themeStyles.backgroundColor}</p>
          </div>
          <div>
            <h4 style={{ margin: 0 }}>Text Color</h4>
            <p style={{ margin: 0, fontFamily: 'monospace' }}>{themeStyles.color}</p>
          </div>
        </div>
      </ThemedBox>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: theme === 'light' ? '#e3f2fd' : '#1a237e',
    
        
        borderRadius: '8px',
        border: `1px solid ${theme === 'light' ? '#bbdefb' : '#283593'}`
      }}>
        <h4>How useContext Works:</h4>
        <ul style={{ textAlign: 'left', color: theme==='light' ? '#151617ff' : '#2f35b3ff' }}>
          <li>Create context with <code>React.createContext()</code></li>
          <li>Wrap components with <code>Context.Provider</code></li>
          <li>Use <code>useContext(Context)</code> in any child component</li>
          <li>No need to pass props through intermediate components</li>
        </ul>
      </div>
    </div>
  );
};

export default UseContextExample;