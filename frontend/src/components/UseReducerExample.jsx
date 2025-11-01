// // components/UseReducerExample.jsx
// import React, { useReducer } from 'react';

// // Reducer function
// const todoReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return {
//         ...state,
//         todos: [...state.todos, {
//           id: Date.now(),
//           text: action.payload,
//           completed: false
//         }]
//       };
    
//     case 'TOGGLE_TODO':
//       return {
//         ...state,
//         todos: state.todos.map(todo =>
//           todo.id === action.payload
//             ? { ...todo, completed: !todo.completed }
//             : todo
//         )
//       };
    
//     case 'DELETE_TODO':
//       return {
//         ...state,
//         todos: state.todos.filter(todo => todo.id !== action.payload)
//       };
    
//     case 'SET_FILTER':
//       return {
//         ...state,
//         filter: action.payload
//       };
    
//     default:
//       return state;
//   }
// };

// const initialState = {
//   todos: [],
//   filter: 'all'
// };

// const UseReducerExample = () => {
//   const [state, dispatch] = useReducer(todoReducer, initialState);
//   const [inputValue, setInputValue] = React.useState('');

//   const addTodo = () => {
//     if (inputValue.trim()) {
//       dispatch({ type: 'ADD_TODO', payload: inputValue });
//       setInputValue('');
//     }
//   };

//   const filteredTodos = state.todos.filter(todo => {
//     if (state.filter === 'completed') return todo.completed;
//     if (state.filter === 'active') return !todo.completed;
//     return true;
//   });

//   return (
//     <div className="hook-example">
//       <h2>useReducer Hook</h2>
      
//       <div>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Enter todo"
//           onKeyPress={(e) => e.key === 'Enter' && addTodo()}
//         />
//         <button onClick={addTodo}>Add Todo</button>
//       </div>

//       <div>
//         <label>Filter: </label>
//         <select
//           value={state.filter}
//           onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
//         >
//           <option value="all">All</option>
//           <option value="active">Active</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>

//       <ul>
//         {filteredTodos.map(todo => (
//           <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
//             <span onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
//               {todo.text}
//             </span>
//             <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>

//       <p>Total: {state.todos.length} | Completed: {state.todos.filter(t => t.completed).length}</p>
//     </div>
//   );
// };

// export default UseReducerExample;

// components/UseReducerExample.jsx
import React, { useReducer, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false,
          createdAt: new Date().toLocaleString()
        }]
      };
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };
    
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    
    case 'LOAD_TODOS':
      return {
        ...state,
        todos: action.payload
      };
    
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  filter: 'all' // all, active, completed
};

const UseReducerExample = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const { theme, themeStyles } = useTheme();

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      dispatch({ type: 'EDIT_TODO', payload: { id: editingId, text: editText } });
      setEditingId(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'completed') return todo.completed;
    if (state.filter === 'active') return !todo.completed;
    return true;
  });

  const stats = {
    total: state.todos.length,
    completed: state.todos.filter(t => t.completed).length,
    active: state.todos.filter(t => !t.completed).length
  };

  return (
    <div className="hook-example" style={themeStyles}>
      <h2>useReducer Hook</h2>
      <p>Managing complex state with reducers - like having your own state management</p>

      {/* Add Todo Section */}
      <div className="section">
        <h3>Add New Todo</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new todo..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            style={{ flex: 1, minWidth: '200px', padding: '8px' }}
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="section">
        <h3>Filters & Actions</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={state.filter}
            onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
            style={{ padding: '8px' }}
          >
            <option value="all">All ({stats.total})</option>
            <option value="active">Active ({stats.active})</option>
            <option value="completed">Completed ({stats.completed})</option>
          </select>
          
          <button 
            onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            disabled={stats.completed === 0}
          >
            Clear Completed
          </button>
          
          <button 
            onClick={() => dispatch({ type: 'LOAD_TODOS', payload: [] })}
            disabled={state.todos.length === 0}
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="section">
        <h3>
          Todo List {filteredTodos.length > 0 && 
            `(${filteredTodos.length} ${filteredTodos.length === 1 ? 'item' : 'items'})`
          }
        </h3>
        
        {filteredTodos.length === 0 ? (
          <p style={{ textAlign: 'center', opacity: 0.7 }}>
            {state.todos.length === 0 ? 'No todos yet!' : 'No todos match the current filter'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredTodos.map(todo => (
              <div
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  backgroundColor: theme === 'light' ? '#f8f9fa' : '#444',
                  border: `1px solid ${theme === 'light' ? '#dee2e6' : '#555'}`,
                  borderRadius: '4px'
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                />
                
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      style={{ flex: 1, padding: '4px' }}
                      autoFocus
                    />
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        flex: 1,
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        opacity: todo.completed ? 0.7 : 1
                      }}
                    >
                      {todo.text}
                    </span>
                    <small style={{ opacity: 0.6 }}>{todo.createdAt}</small>
                    <button onClick={() => startEditing(todo)}>Edit</button>
                    <button 
                      onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                      style={{ backgroundColor: '#dc3545' }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="section">
        <h3>Statistics</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '15px',
          textAlign: 'center'
        }}>
          <div style={{ 
            padding: '15px', 
            backgroundColor: theme === 'light' ? '#e3f2fd' : '#1a237e',
            borderRadius: '8px'
          }}>
            <h4 style={{ margin: 0 }}>Total</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</p>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: theme === 'light' ? '#e8f5e8' : '#1b5e20',
            borderRadius: '8px'
          }}>
            <h4 style={{ margin: 0 }}>Active</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{stats.active}</p>
          </div>
          <div style={{ 
            padding: '15px', 
            backgroundColor: theme === 'light' ? '#fff3e0' : '#e65100',
            borderRadius: '8px'
          }}>
            <h4 style={{ margin: 0 }}>Completed</h4>
            <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{stats.completed}</p>
          </div>
        </div>
      </div>

      {/* Reducer Explanation */}
      <div className="section">
        <h3>How useReducer Works</h3>
        <div style={{ 
          backgroundColor: theme === 'light' ? '#f8f9fa' : '#444',
          padding: '15px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          <div><strong>State:</strong> {JSON.stringify(state, null, 2)}</div>
        </div>
        <ul style={{ textAlign: 'left', marginTop: '15px', color: theme === 'light' ? '#0b0c0cff' : '#444', }}>
          <li><strong>useReducer</strong> is preferable to useState when you have complex state logic</li>
          <li>It uses a reducer function: <code>(state, action) =&gt; newState</code></li>
          <li>Actions are dispatched with <code>dispatch(action)</code></li>
          <li>Similar to Redux pattern but built into React</li>
        </ul>
      </div>
    </div>
  );
};

export default UseReducerExample;