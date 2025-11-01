
import React, { useState, useCallback, memo, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

// Child component with memo to prevent unnecessary re-renders
const ChildComponent = memo(({ onClick, children, logRender }) => {
  logRender('ChildComponent');
  return (
    <button onClick={onClick} style={{ margin: '5px', padding: '10px 15px' }}>
      {children}
    </button>
  );
});

// Expensive list component
const ExpensiveList = memo(({ items, onItemClick, logRender }) => {
  logRender('ExpensiveList');
  
  return (
    <div style={{ 
      padding: '15px', 
      border: '2px dashed #ccc',
      borderRadius: '4px',
      margin: '10px 0'
    }}>
      <h4>Expensive List (Memoized)</h4>
      <ul style={{ listStyle: 'none', padding: 0 ,color:'black'}}>
        {items.map((item, index) => (
          <li 
            key={index}
            onClick={() => onItemClick(item)}
            style={{
              padding: '8px',
              margin: '5px 0',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
});

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('');
  const [items, setItems] = useState(['Apple', 'Banana', 'Orange']);
  const [newItem, setNewItem] = useState('');
  const [renderLog, setRenderLog] = useState([]);
  const { themeStyles } = useTheme();

  const logRender = useCallback((componentName) => {
    setRenderLog(prev => [...prev, {
      component: componentName,
      time: new Date().toLocaleTimeString(),
      count: count
    }].slice(-10)); // Keep only last 10 renders
  }, [count]);

  // Without useCallback - new function created on every render
  // const increment = () => setCount(count + 1);

  // With useCallback - function memoized with empty dependency array
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  // useCallback with dependencies
  const addItem = useCallback(() => {
    if (newItem.trim()) {
      setItems(prevItems => [...prevItems, newItem]);
      setNewItem('');
    }
  }, [newItem]);

  const handleItemClick = useCallback((item) => {
    alert(`You clicked: ${item}`);
  }, []);

  const clearLog = useCallback(() => {
    setRenderLog([]);
  }, []);

  // Effect to demonstrate render counts
  useEffect(() => {
    logRender('UseCallbackExample');
  }, [logRender, count, value, items]);

  return (
    <div className="hook-example" style={themeStyles}>
      <h2>useCallback Hook</h2>
      <p>
        useCallback memoizes functions to prevent unnecessary re-renders of child components.
      </p>

      {/* Counter Section */}
      <div className="section">
        <h3>Counter with Memoized Callbacks</h3>
        <p>Count: <strong>{count}</strong></p>
        <div>
          <ChildComponent onClick={increment} logRender={logRender}>
            Increment
          </ChildComponent>
          <ChildComponent onClick={decrement} logRender={logRender}>
            Decrement
          </ChildComponent>
          <ChildComponent onClick={reset} logRender={logRender}>
            Reset
          </ChildComponent>
        </div>
        <p>
          <small>
            These buttons use useCallback - they won't cause ChildComponent to re-render unnecessarily
          </small>
        </p>
      </div>

      {/* Input Section (to cause re-renders) */}
      <div className="section">
        <h3>Input (Causes Re-renders)</h3>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type here to cause re-renders..."
          style={{ padding: '8px', width: '300px' }}
        />
        <p>Input value: {value || '(empty)'}</p>
      </div>

      {/* List Management */}
      <div className="section">
        <h3>List Management</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="New item..."
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            style={{ padding: '8px' }}
          />
          <button onClick={addItem}>Add Item</button>
        </div>
        
        <ExpensiveList 
          items={items} 
          onItemClick={handleItemClick}
          logRender={logRender}
        />
        
        <p>
          <small>
            The list component is memoized and the click handler uses useCallback
          </small>
        </p>
      </div>

      {/* Render Log */}
      <div className="section">
        <h3>Component Render Log</h3>
        <div style={{ 
          maxHeight: '200px', 
          overflowY: 'auto',
          // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
          borderRadius: '4px',
          padding: '10px'
        }}>
          {renderLog.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.7 }}>No renders logged yet</p>
          ) : (
            renderLog.map((log, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '5px 0',
                  borderBottom: '1px solid #ddd',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              >
                <span>{log.component}</span>
                <span>Count: {log.count}</span>
                <span>{log.time}</span>
              </div>
            )).reverse()
          )}
        </div>
        <button onClick={clearLog} style={{ marginTop: '10px' }}>Clear Log</button>
      </div>

      {/* useCallback Explanation */}
      <div className="section">
        <h3>Understanding useCallback</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          
          textAlign: 'left'
        }}>
          <div>
            <h4>Without useCallback</h4>
            <ul style={{color:'black'}}>
              <li>New function created on every render</li>
              <li>Child components re-render unnecessarily</li>
              <li>Performance issues with expensive children</li>
              <li>Broken memoization in child components</li>
            </ul>
          </div>
          <div>
            <h4>With useCallback</h4>
            <ul style={{color:'black'}}>
              <li>Same function reference across renders</li>
              <li>Child components don't re-render unnecessarily</li>
              <li>Better performance with React.memo</li>
              <li>Proper dependency management in effects</li>
            </ul>
          </div>
        </div>

        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: themeStyles.theme === 'light' ? '#e3f2fd' : '#4f57b4ff',
          borderRadius: '4px'
        }}>
          <h4 style={{ margin: 0 }}>💡 When to Use useCallback</h4>
          <ul style={{ margin: '10px 0 0 0', color:'black' }}>
            <li>Functions passed to memoized child components</li>
            <li>Functions used in dependency arrays of other hooks</li>
            <li>Event handlers in frequently re-rendering components</li>
            <li>When you can measure performance benefits</li>
          </ul>
        </div>

        <div style={{ 
          marginTop: '15px',
          padding: '15px',
          backgroundColor: themeStyles.theme === 'light' ? '#fff3cd' : '#c7b5afff',
          borderRadius: '4px',
          border: `1px solid ${themeStyles.theme === 'light' ? '#ffeaa7' : '#4e342e'}`
        }}>
          <h4 style={{ margin: 0 }}>⚠️ Important Note</h4>
          <p style={{ margin: '10px 0 0 0' }}>
            useCallback itself has a cost. Don't use it everywhere - only when you have 
            measurable performance issues and the function is causing unnecessary re-renders.
          </p>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="section">
        <h3>Code Comparison</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <div style={{ 
            padding: '15px', 
            backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#d4bfbfff',
            borderRadius: '4px'
          }}>
            <h4 style={{ margin: 0 }}>Without useCallback</h4>
            <pre style={{ margin: '10px 0 0 0', whiteSpace: 'pre-wrap' }}>
{`const handleClick = () => {
  setCount(count + 1);
};
// New function on every render
// Causes child re-renders`}
            </pre>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor:themeStyles.theme === 'light' ? '#f8f9fa' : '#9b8e8eff',
            borderRadius: '4px'
          }}>
            <h4 style={{ margin: 0 }}>With useCallback</h4>
            <pre style={{ margin: '10px 0 0 0', whiteSpace: 'pre-wrap' }}>
{`const handleClick = useCallback(() => {
  setCount(prev => prev + 1);
}, []);
// Same function reference
// No unnecessary re-renders`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCallbackExample;