// // components/UseStateExample.jsx
// import React, { useState } from 'react';

// const UseStateExample = () => {
//   const [count, setCount] = useState(0);
//   const [name, setName] = useState('');
//   const [isVisible, setIsVisible] = useState(true);

//   return (
//     <div className="hook-example">
//       <h2>useState Hook</h2>
      
//       <div className="counter-section">
//         <p>Count: {count}</p>
//         <button onClick={() => setCount(count + 1)}>Increment</button>
//         <button onClick={() => setCount(count - 1)}>Decrement</button>
//         <button onClick={() => setCount(0)}>Reset</button>
//       </div>

//       <div className="input-section">
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Enter your name"
//         />
//         <p>Hello, {name || 'stranger'}!</p>
//       </div>

//       <div className="toggle-section">
//         <button onClick={() => setIsVisible(!isVisible)}>
//           {isVisible ? 'Hide' : 'Show'} Message
//         </button>
//         {isVisible && <p>This message is visible!</p>}
//       </div>
//     </div>
//   );
// };

// export default UseStateExample;
// components/UseStateExample.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const UseStateExample = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const { themeStyles } = useTheme();

  const addTodo = () => {
    if (todoInput.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoInput, completed: false }]);
      setTodoInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="hook-example" style={themeStyles}>
      <h2>useState Hook</h2>
      
      {/* Counter Section */}
      <div className="section">
        <h3>Counter Example</h3>
        <p>Count: {count}</p>
        <div className="button-group">
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <button onClick={() => setCount(count - 1)}>Decrement</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
      </div>

      {/* Input Section */}
      <div className="section">
        <h3>Input Example</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{ padding: '8px', margin: '5px' }}
        />
        <p>Hello, {name || 'stranger'}!</p>
      </div>

      {/* Toggle Section */}
      <div className="section">
        <h3>Toggle Example</h3>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'} Message
        </button>
        {isVisible && (
          <p style={{ 
            padding: '10px', 
            backgroundColor: themeStyles.theme === 'light' ? '#f0f0f0' : '#444',
            borderRadius: '4px',
            marginTop: '10px'
          }}>
            This message is visible!
          </p>
        )}
      </div>

      {/* Todo List Section */}
      <div className="section">
        <h3>Todo List</h3>
        <div>
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
            placeholder="Add a todo"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            style={{ padding: '8px', margin: '5px' }}
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '8px',
              margin: '5px 0',
              backgroundColor: themeStyles.theme === 'light' ? '#f9f9f9' : '#555',
              borderRadius: '4px'
            }}>
              <span 
                onClick={() => toggleTodo(todo.id)}
                style={{ 
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                style={{ marginLeft: '10px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UseStateExample;