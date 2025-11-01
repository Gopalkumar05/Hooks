// // components/UseRefExample.jsx
// import React, { useRef, useState, useEffect } from 'react';

// const UseRefExample = () => {
//   const inputRef = useRef(null);
//   const countRef = useRef(0);
//   const prevValueRef = useRef('');
//   const [value, setValue] = useState('');
//   const [renderCount, setRenderCount] = useState(0);

//   // Focus input on mount
//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);

//   // Track previous value
//   useEffect(() => {
//     prevValueRef.current = value;
//   }, [value]);

//   const handleButtonClick = () => {
//     inputRef.current.focus();
//     countRef.current += 1;
//     console.log(`Button clicked ${countRef.current} times`);
//   };

//   const forceRender = () => {
//     setRenderCount(prev => prev + 1);
//   };

//   return (
//     <div className="hook-example">
//       <h2>useRef Hook</h2>
      
//       <div>
//         <input
//           ref={inputRef}
//           type="text"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           placeholder="Type something..."
//         />
//         <button onClick={handleButtonClick}>Focus Input</button>
//       </div>

//       <div>
//         <p>Current Value: {value}</p>
//         <p>Previous Value: {prevValueRef.current}</p>
//         <p>Render Count: {renderCount}</p>
//         <p>Button Click Count (ref): {countRef.current}</p>
//       </div>

//       <button onClick={forceRender}>Force Re-render</button>
//     </div>
//   );
// };

// export default UseRefExample;

// components/UseRefExample.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const UseRefExample = () => {
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const prevValueRef = useRef('');
  const intervalRef = useRef(null);
  const [value, setValue] = useState('');
  const [renderCount, setRenderCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const { themeStyles } = useTheme();

  // Focus input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Track previous value
  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const handleButtonClick = () => {
    inputRef.current.focus();
    countRef.current += 1;
    console.log(`Button clicked ${countRef.current} times`);
  };

  const forceRender = () => {
    setRenderCount(prev => prev + 1);
  };

  const startTimer = () => {
    if (!isTimerRunning) {
      setIsTimerRunning(true);
      intervalRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(0);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="hook-example" style={themeStyles}>
      <h2>useRef Hook</h2>
      <p>useRef returns a mutable ref object that persists for the full lifetime of the component.</p>

      {/* DOM Reference Example */}
      <div className="section">
        <h3>DOM Element Reference</h3>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="This input gets auto-focused..."
          style={{ padding: '8px', margin: '5px', width: '300px' }}
        />
        <button onClick={handleButtonClick}>Focus Input & Count Clicks</button>
        <p>
          <small>Input is automatically focused on component mount using useRef</small>
        </p>
      </div>

      {/* Mutable Values Example */}
      <div className="section">
        <h3>Mutable Values Without Re-renders</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div style={{ 
            padding: '15px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h4>Current Value</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{value || '(empty)'}</p>
          </div>
          <div style={{ 
            padding: '15px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h4>Previous Value</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{prevValueRef.current || '(empty)'}</p>
          </div>
          <div style={{ 
            padding: '15px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h4>Render Count</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{renderCount}</p>
          </div>
          <div style={{ 
            padding: '15px', 
            // backgroundColor:themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h4>Button Clicks (Ref)</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{countRef.current}</p>
          </div>
        </div>
        <button onClick={forceRender} style={{ marginTop: '10px' }}>
          Force Re-render (won't reset ref values)
        </button>
      </div>

      {/* Timer with useRef */}
      <div className="section">
        <h3>Timer with useRef (Interval Management)</h3>
        <div style={{ 
          padding: '20px', 
          // backgroundColor: themeStyles.theme === 'light' ? '#e3f2fd' : '#1a237e',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '15px'
        }}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>{timer}s</p>
          <p style={{ margin: 0, opacity: 0.8 }}>
            Status: {isTimerRunning ? 'Running' : 'Stopped'}
          </p>
        </div>
        <div className="button-group">
          <button 
            onClick={startTimer} 
            disabled={isTimerRunning}
          >
            Start Timer
          </button>
          <button 
            onClick={stopTimer} 
            disabled={!isTimerRunning}
          >
            Stop Timer
          </button>
          <button onClick={resetTimer}>Reset Timer</button>
        </div>
        <p>
          <small>
            The timer interval is stored in a ref to persist between renders and properly clean up
          </small>
        </p>
      </div>

      {/* useRef Use Cases */}
      <div className="section">
        <h3>Common useRef Use Cases</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '15px',
          textAlign: 'left'
        }}>
          <div style={{ 
            padding: '15px', 
            // backgroundColor:themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px'
          }}>
            <h4 style={{ margin: 0 }}>📝 DOM Access</h4>
            <p style={{ margin: '10px 0 0 0' }}>
              Direct access to DOM elements for focus, measurements, or animations
            </p>
          </div>
          <div style={{ 
            padding: '15px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px'
          }}>
            <h4 style={{ margin: 0 }}>💾 Persistent Values</h4>
            <p style={{ margin: '10px 0 0 0' }}>
              Store values that persist across renders without causing re-renders
            </p>
          </div>
          <div style={{ 
            padding: '15px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px'
          }}>
            <h4 style={{ margin: 0 }}>⏱️ Interval/Timeout IDs</h4>
            <p style={{ margin: '10px 0 0 0' }}>
              Store timer IDs for proper cleanup in useEffect
            </p>
          </div>
          <div style={{ 
            padding: '15px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px'
          }}>
            <h4 style={{ margin: 0 }}>📊 Previous Values</h4>
            <p style={{ margin: '10px 0 0 0' }}>
              Track previous state or prop values for comparisons
            </p>
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="section">
        <h3>useRef vs useState</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          textAlign: 'left'
        }}>
          <div>
            <h4>useRef</h4>
            <ul style={{color:'black'}}>
              <li>Returns mutable object with <code>.current</code> property</li>
              <li>Changing <code>.current</code> doesn't cause re-render</li>
              <li>Perfect for values that don't affect rendering</li>
              <li>Persists data between renders</li>
            </ul>
          </div>
          <div>
            <h4>useState</h4>
            <ul style={{color:'black'}}>
              <li>Returns state value and setter function</li>
              <li>Changing state causes re-render</li>
              <li>Used for values that affect rendering</li>
              <li>Triggers component updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseRefExample;