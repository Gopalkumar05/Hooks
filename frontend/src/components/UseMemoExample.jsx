// // components/UseMemoExample.jsx
// import React, { useState, useMemo } from 'react';

// // Expensive calculation function
// const expensiveCalculation = (num) => {
//   console.log('Calculating...');
//   for (let i = 0; i < 1000000000; i++) {
//     num += 1;
//   }
//   return num;
// };

// const UseMemoExample = () => {
//   const [count, setCount] = useState(0);
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   // Without useMemo - recalculates on every render
//   // const calculation = expensiveCalculation(count);

//   // With useMemo - only recalculates when count changes
//   const calculation = useMemo(() => expensiveCalculation(count), [count]);

//   const addTodo = () => {
//     if (inputValue.trim()) {
//       setTodos([...todos, inputValue]);
//       setInputValue('');
//     }
//   };

//   return (
//     <div className="hook-example">
//       <h2>useMemo Hook</h2>
      
//       <div>
//         <h3>Todos</h3>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Add todo"
//         />
//         <button onClick={addTodo}>Add Todo</button>
//         <ul>
//           {todos.map((todo, index) => (
//             <li key={index}>{todo}</li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h3>Expensive Calculation</h3>
//         <p>Count: {count}</p>
//         <button onClick={() => setCount(count + 1)}>Increment</button>
//         <p>Calculation Result: {calculation}</p>
//         <p><small>Check console to see when calculation runs</small></p>
//       </div>
//     </div>
//   );
// };

// export default UseMemoExample;

// components/UseMemoExample.jsx
import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

// Expensive calculation function
const expensiveCalculation = (num) => {
  console.log('Calculating expensive result...');
  // Simulate expensive computation
  for (let i = 0; i < 1000000000; i++) {
    num += 0.0000001;
  }
  return Math.round(num);
};

// Fibonacci calculation (another expensive operation)
const fibonacci = (n) => {
  console.log('Calculating fibonacci...');
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// Filter and sort users (simulating complex data processing)
const processUsers = (users, filter) => {
  console.log('Processing users...');
  const filtered = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );
  
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
};

const UseMemoExample = () => {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);
  const [fibNumber, setFibNumber] = useState(10);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 28 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 25 },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 30 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 35 }
  ]);
  const [filter, setFilter] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const { themeStyles } = useTheme();

  // Without useMemo - recalculates on every render
  // const calculation = expensiveCalculation(number);

  // With useMemo - only recalculates when number changes
  const calculation = useMemo(() => expensiveCalculation(number), [number]);

  // Memoized fibonacci calculation
  const fibResult = useMemo(() => fibonacci(fibNumber), [fibNumber]);

  // Memoized user processing
  const processedUsers = useMemo(() => processUsers(users, filter), [users, filter]);

  // Memoized statistics
  const userStats = useMemo(() => {
    console.log('Calculating user statistics...');
    const totalUsers = users.length;
    const averageAge = users.reduce((sum, user) => sum + user.age, 0) / totalUsers;
    const oldestUser = users.reduce((oldest, user) => 
      user.age > oldest.age ? user : oldest, users[0]
    );
    const youngestUser = users.reduce((youngest, user) => 
      user.age < youngest.age ? user : youngest, users[0]
    );

    return {
      totalUsers,
      averageAge: Math.round(averageAge),
      oldestUser: oldestUser?.name || 'N/A',
      youngestUser: youngestUser?.name || 'N/A'
    };
  }, [users]);

  const addUser = () => {
    if (newUserName.trim() && newUserEmail.trim()) {
      const newUser = {
        id: Date.now(),
        name: newUserName,
        email: newUserEmail,
        age: Math.floor(Math.random() * 30) + 20 // Random age between 20-50
      };
      setUsers([...users, newUser]);
      setNewUserName('');
      setNewUserEmail('');
    }
  };

  return (
    <div className="hook-example" style={themeStyles}>
      <h2>useMemo Hook</h2>
      <p>useMemo memoizes expensive calculations to prevent unnecessary re-computations.</p>

      {/* Counter Section (to cause re-renders) */}
      <div className="section">
        <h3>Re-render Trigger</h3>
        <p>This counter causes re-renders but doesn't affect memoized calculations</p>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment Count</button>
        <p><small>Check console to see when calculations run</small></p>
      </div>

      {/* Expensive Calculation Example */}
      <div className="section">
        <h3>Expensive Calculation</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 0)}
            min="1"
            max="1000000"
            style={{ padding: '8px', width: '120px' }}
          />
          <button onClick={() => setNumber(number + 1000)}>+1000</button>
          <button onClick={() => setNumber(number + 10000)}>+10000</button>
        </div>
        <p>Calculation Result: <strong>{calculation}</strong></p>
        <p>
          <small>
            This expensive calculation only runs when the number changes, not on every render
          </small>
        </p>
      </div>

      {/* Fibonacci Example */}
      <div className="section">
        <h3>Fibonacci Sequence</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <label>Fibonacci of:</label>
          <input
            type="number"
            value={fibNumber}
            onChange={(e) => setFibNumber(parseInt(e.target.value) || 1)}
            min="1"
            max="40"
            style={{ padding: '8px', width: '80px' }}
          />
        </div>
        <p>Fibonacci({fibNumber}) = <strong>{fibResult}</strong></p>
        <p>
          <small>
            Try changing the number and see how it only recalculates when the input changes
          </small>
        </p>
      </div>

      {/* User List with Filter */}
      <div className="section">
        <h3>User List with Search</h3>
        
        {/* Add User Form */}
        <div style={{ 
          padding: '15px', 
          // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h4>Add New User</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Name"
              style={{ padding: '8px' }}
            />
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="Email"
              style={{ padding: '8px' }}
            />
            <button onClick={addUser}>Add User</button>
          </div>
        </div>

        {/* Search Filter */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search users by name or email..."
            style={{ padding: '8px', width: '300px' }}
          />
        </div>

        {/* User Statistics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '10px',
          marginBottom: '15px'
        }}>
          <div style={{ 
            padding: '10px', 
            // backgroundColor:themeStyles.theme === 'light' ? '#e3f2fd' : '#1a237e',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <div>Total Users</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{userStats.totalUsers}</div>
          </div>
          <div style={{ 
            padding: '10px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#e8f5e8' : '#1b5e20',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <div>Avg Age</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{userStats.averageAge}</div>
          </div>
          <div style={{ 
            padding: '10px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#fff3e0' : '#e65100',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <div>Oldest</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{userStats.oldestUser}</div>
          </div>
          <div style={{ 
            padding: '10px', 
       
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <div>Youngest</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{userStats.youngestUser}</div>
          </div>
        </div>

        {/* User List */}
        <div>
          <h4>Filtered Users ({processedUsers.length})</h4>
          {processedUsers.length === 0 ? (
            <p style={{ textAlign: 'center', opacity: 0.7 }}>No users found</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {processedUsers.map(user => (
                <div
                  key={user.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#555',
                    border: `1px solid ${themeStyles.theme === 'light' ? '#dee2e6' : '#666'}`,
                    borderRadius: '4px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                    <div style={{ fontSize: '14px', opacity: 0.8 }}>{user.email}</div>
                  </div>
                  <div style={{ fontSize: '14px' }}>Age: {user.age}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* useMemo Explanation */}
      <div className="section">
        <h3>When to Use useMemo</h3>
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
            <h4 style={{ margin: 0 }}>✅ Use useMemo for:</h4>
            <ul style={{ margin: '10px 0 0 0' ,color: themeStyles.theme === 'light' ? '#f8f9fa' : '#444'}}>
              <li>Expensive calculations</li>
              <li>Complex object transformations</li>
              <li>Array filtering/sorting</li>
              <li>Referential equality in dependencies</li>
            </ul>
          </div>
          <div style={{ 
            padding: '15px', 
            // backgroundColor: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',
            borderRadius: '4px'
          }}>
            <h4 style={{ margin: 0 }}>❌ Avoid useMemo for:</h4>
            <ul style={{ margin: '10px 0 0 0' ,color: themeStyles.theme === 'light' ? '#f8f9fa' : '#444',}}>
              <li>Simple calculations</li>
              <li>Primitive values</li>
              <li>Every function call</li>
              <li>Premature optimization</li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '15px',
          padding: '15px',
          // backgroundColor: themeStyles.theme === 'light' ? '#fff3cd' : '#5d4037',
          borderRadius: '4px',
          border: `1px solid ${themeStyles.theme === 'light' ? '#ffeaa7' : '#4e342e'}`
        }}>
          <h4 style={{ margin: 0 }}>💡 Performance Tip</h4>
          <p style={{ margin: '10px 0 0 0' }}>
            useMemo comes with its own cost (memory and comparison). Only use it when 
            the computation is truly expensive and you can measure the performance benefit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseMemoExample;