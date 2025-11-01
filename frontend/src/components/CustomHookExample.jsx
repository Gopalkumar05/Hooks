// components/CustomHookExample.jsx
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useFetch } from '../hooks/useFetch';
import { useToggle } from '../hooks/useToggle';
import { useDebounce } from '../hooks/useDebounce';
import { useEventListener } from '../hooks/useEventListener';
import { useTheme } from '../context/ThemeContext';

const CustomHookExample = () => {
  // Using useLocalStorage custom hook
  const [name, setName] = useLocalStorage('username', '');
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');

  // Using useFetch custom hook
  const [userId, setUserId] = useState(1);
  const { data: user, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  // Using useToggle custom hook
  const [isOn, toggleIsOn] = useToggle(false);
  const [isModalOpen, toggleModal] = useToggle(false);

  // Using useDebounce custom hook
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Using useEventListener custom hook
  const [key, setKey] = useState('');
  useEventListener('keydown', (e) => {
    setKey(e.key);
  });

  const { themeStyles } = useTheme();

  return (
    <div className="hook-example" style={themeStyles}>
      <h2>Custom Hooks</h2>
      <p>Custom hooks let you extract component logic into reusable functions.</p>

      {/* useLocalStorage Hook */}
      <div className="section">
        <h3>useLocalStorage Hook</h3>
        <p>Persist state in localStorage automatically</p>
        
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h4>User Preferences</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (saved in localStorage)"
                style={{ padding: '8px' }}
              />
              <p>Hello, <strong>{name || 'stranger'}</strong>!</p>
              
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                style={{ padding: '8px' }}
              >
                <option value="light">Light Theme</option>
                <option value="dark">Dark Theme</option>
                {/* <option value="blue">Blue Theme</option> */}
              </select>
              <p>Selected theme: <strong>{theme}</strong></p>
            </div>
          </div>
          
          <div style={{ 
            flex: 1, 
            minWidth: '250px',
            padding: '15px',
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px'
          }}>
            <h4>LocalStorage Data</h4>
            <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
              <div>username: "{name}"</div>
              <div>app-theme: "{theme}"</div>
            </div>
            <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
              💡 Refresh the page to see persisted data
            </p>
          </div>
        </div>
      </div>

      {/* useFetch Hook */}
      <div className="section">
        <h3>useFetch Hook</h3>
        <p>Simplify data fetching with built-in loading and error states</p>
        
        <div className="button-group">
          <button onClick={() => setUserId(userId + 1)}>Next User</button>
          <button onClick={() => setUserId(Math.max(1, userId - 1))}>Previous User</button>
          <span style={{ marginLeft: '15px' }}>User ID: {userId}</span>
        </div>

        {loading && (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            // backgroundColor: themeStyles.theme === 'light' ? '#e3f2fd' : '#1a237e',
            borderRadius: '4px',
            margin: '10px 0'
          }}>
            ⏳ Loading user data...
          </div>
        )}

        {error && (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            // backgroundColor: themeStyles.theme === 'light' ? '#ffebee' : '#b71c1c',
            borderRadius: '4px',
            margin: '10px 0',
            color: '#d32f2f'
          }}>
            ❌ Error: {error}
          </div>
        )}

        {user && !loading && (
          <div style={{ 
            padding: '20px',
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px',
            margin: '10px 0'
          }}>
            <h4>User Information</h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '15px',
              textAlign: 'left'
            }}>
              <div>
                <strong>Name:</strong> {user.name}
              </div>
              <div>
                <strong>Email:</strong> {user.email}
              </div>
              <div>
                <strong>Phone:</strong> {user.phone}
              </div>
              <div>
                <strong>Website:</strong> {user.website}
              </div>
              <div>
                <strong>Company:</strong> {user.company?.name}
              </div>
              <div>
                <strong>City:</strong> {user.address?.city}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* useToggle Hook */}
      <div className="section">
        <h3>useToggle Hook</h3>
        <p>Simplify boolean state management</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px'
        }}>
          <div style={{ 
            padding: '20px',
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h4>Toggle Switch</h4>
            <div 
              onClick={toggleIsOn}
              style={{
                width: '60px',
                height: '30px',
                backgroundColor: isOn ? '#4CAF50' : '#ccc',
                borderRadius: '15px',
                margin: '10px auto',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: isOn ? '32px' : '2px',
                  transition: 'left 0.3s'
                }}
              />
            </div>
            <p>Status: <strong>{isOn ? 'ON' : 'OFF'}</strong></p>
            <button onClick={toggleIsOn}>
              Toggle {isOn ? 'Off' : 'On'}
            </button>
          </div>

          <div style={{ 
            padding: '20px',
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h4>Modal State</h4>
            <button onClick={toggleModal}>
              {isModalOpen ? 'Close' : 'Open'} Modal
            </button>
            {isModalOpen && (
              <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 1000,
                color: 'black'
              }}>
                <h3>Modal Content</h3>
                <p>This modal is controlled by useToggle hook!</p>
                <button onClick={toggleModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* useDebounce Hook */}
      <div className="section">
        <h3>useDebounce Hook</h3>
        <p>Delay processing of rapidly changing values</p>
        
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search... (debounced 500ms)"
            style={{ padding: '8px', width: '300px' }}
          />
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px',
          marginTop: '15px'
        }}>
          <div style={{ 
            padding: '15px',
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h4>Current Input</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {searchTerm || '(empty)'}
            </p>
          </div>
          <div style={{ 
            padding: '15px',
            // backgroundColor: themeStyles.theme === 'light' ? '#e8f5e8' : '#1b5e20',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h4>Debounced Value</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {debouncedSearchTerm || '(empty)'}
            </p>
          </div>
        </div>
        
        <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
          💡 Notice how the debounced value updates only after you stop typing
        </p>
      </div>

      {/* useEventListener Hook */}
      <div className="section">
        <h3>useEventListener Hook</h3>
        <p>Simplify event listener management</p>
        
        <div style={{ 
          padding: '30px',
          // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
          borderRadius: '4px',
          textAlign: 'center',
          border: `2px dashed ${themeStyles.theme === 'light' ? '#ccc' : '#666'}`
        }}>
          <h4>Press any key</h4>
          {key ? (
            <div>
              <p style={{ fontSize: '48px', margin: '10px 0', fontWeight: 'bold' }}>
                {key}
              </p>
              <p>Key code: <code>{key.charCodeAt(0)}</code></p>
            </div>
          ) : (
            <p style={{ fontSize: '18px', opacity: 0.7 }}>
              No key pressed yet...
            </p>
          )}
        </div>
        <p style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
          💡 This uses a custom hook to handle keydown events globally
        </p>
      </div>

      {/* Custom Hooks Explanation */}
      <div className="section">
        <h3>Building Custom Hooks</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          textAlign: 'left'
        }}>
          <div>
            <h4>Benefits of Custom Hooks</h4>
            <ul style={{color:'black'}}>
              <li><strong>Reusability:</strong> Share logic across components</li>
              <li><strong>Readability:</strong> Extract complex logic</li>
              <li><strong>Testability:</strong> Test hooks independently</li>
              <li><strong>Composition:</strong> Combine multiple hooks</li>
              <li><strong>Abstraction:</strong> Hide implementation details</li>
            </ul>
          </div>
          <div>
            <h4>Custom Hook Rules</h4>
            <ul style={{color:'black'}}>
              <li>Name must start with "use"</li>
              <li>Can call other hooks</li>
              <li>Should return values or functions</li>
              <li>Follow React hook rules</li>
              <li>Keep them focused and simple</li>
            </ul>
          </div>
        </div>

        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          // backgroundColor: themeStyles.theme === 'light' ? '#e3f2fd' : '#1a237e',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <h4 style={{ margin: 0 }}>Example: useLocalStorage Implementation</h4>
          <pre style={{ margin: '10px 0 0 0', whiteSpace: 'pre-wrap' }}>
{`export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CustomHookExample;