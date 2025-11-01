// // components/UseEffectExample.jsx
// import React, { useState, useEffect } from 'react';

// const UseEffectExample = () => {
//   const [count, setCount] = useState(0);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const [data, setData] = useState(null);
//   const [userId, setUserId] = useState(1);

//   // Effect without dependencies (runs on every render)
//   useEffect(() => {
//     document.title = `Count: ${count}`;
//   });

//   // Effect with empty dependency array (runs once on mount)
//   useEffect(() => {
//     console.log('Component mounted');
    
//     return () => {
//       console.log('Component will unmount');
//     };
//   }, []);

//   // Effect with dependencies
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
    
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // Effect for API call
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `https://jsonplaceholder.typicode.com/users/${userId}`
//         );
//         const userData = await response.json();
//         setData(userData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [userId]);

//   return (
//     <div className="hook-example">
//       <h2>useEffect Hook</h2>
      
//       <div>
//         <p>Count: {count}</p>
//         <button onClick={() => setCount(count + 1)}>Increment</button>
//       </div>

//       <div>
//         <p>Window Width: {windowWidth}px</p>
//       </div>

//       <div>
//         <button onClick={() => setUserId(userId + 1)}>
//           Next User (Current: {userId})
//         </button>
//         {data && (
//           <div>
//             <h4>User Data:</h4>
//             <p>Name: {data.name}</p>
//             <p>Email: {data.email}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UseEffectExample;


import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const UseEffectExample = () => {
  const [count, setCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState(1);
  const [timer, setTimer] = useState(0);
  const { themeStyles } = useTheme();

  // Effect without dependencies (runs on every render)
  useEffect(() => {
    document.title = `Count: ${count} | useEffect Demo`;
  });

  // Effect with empty dependency array (runs once on mount)
  useEffect(() => {
    console.log('Component mounted');
    
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  // Effect for window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect for API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId]);

  // Effect for timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="hook-example" style={themeStyles}>
      <h2>useEffect Hook</h2>
      
      {/* Document Title Effect */}
      <div className="section">
        <h3>Document Title Update</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <p><small>Check the browser tab title</small></p>
      </div>

      {/* Window Resize Effect */}
      <div className="section">
        <h3>Window Size Tracking</h3>
        <p>Window Width: <strong>{windowWidth}px</strong></p>
        <p><small>Try resizing your browser window</small></p>
      </div>

      {/* API Call Effect */}
      <div className="section">
        <h3>API Data Fetching</h3>
        <div className="button-group">
          <button onClick={() => setUserId(userId + 1)}>Next User</button>
          <button onClick={() => setUserId(Math.max(1, userId - 1))}>Previous User</button>
        </div>
        <p>Current User ID: {userId}</p>
        {data ? (
          <div style={{ 
            padding: '10px', 
            // backgroundColor:themeStyles.theme === 'light' ? '#f0f0f0' : '#444',
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            <h4>User Data:</h4>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
            <p><strong>Website:</strong> {data.website}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      {/* Timer Effect */}
      <div className="section">
        <h3>Timer with Cleanup</h3>
        <p>Timer: <strong>{timer}</strong> seconds</p>
        <p><small>This timer starts when component mounts and cleans up on unmount</small></p>
      </div>

      {/* Effect Explanation */}
      <div className="section" >
        <h3>useEffect Usage Patterns</h3>
        <ul style={{ textAlign: 'left',color:themeStyles.theme==='light'?'#ffffffff':'#080808ff' }}>
          <li><strong>No dependency array:</strong> Runs after every render</li>
          <li><strong>Empty dependency array:</strong> Runs once on mount</li>
          <li><strong>With dependencies:</strong> Runs when dependencies change</li>
          <li><strong>Return function:</strong> Cleanup runs before next effect or unmount</li>
        </ul>
      </div>
    </div>
  );
};

export default UseEffectExample;