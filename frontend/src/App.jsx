// App.jsx
import React, { useState } from 'react';

import UseStateExample from './components/UseStateExample';
import UseEffectExample from './components/UseEffectExample';
import UseContextExample from './components/UseContextExample';
import UseReducerExample from './components/UseReducerExample';
import UseRefExample from './components/UseRefExample';
import UseMemoExample from './components/UseMemoExample';
import UseCallbackExample from './components/UseCallbackExample';
import CustomHookExample from './components/CustomHookExample';
import './App.css';

const hooks = [
  { name: 'useState', component: UseStateExample },
  { name: 'useEffect', component: UseEffectExample },
  { name: 'useContext', component: UseContextExample },
  { name: 'useReducer', component: UseReducerExample },
  { name: 'useRef', component: UseRefExample },
  { name: 'useMemo', component: UseMemoExample },
  { name: 'useCallback', component: UseCallbackExample },
  { name: 'Custom Hooks', component: CustomHookExample },
];

function App() {
  const [activeHook, setActiveHook] = useState('useState');

  const ActiveComponent = hooks.find(hook => hook.name === activeHook)?.component;

  return (
    
      <div className="App">
        <header className="App-header">
          <h1>React Hooks Examples</h1>
          <nav>
            {hooks.map(hook => (
              <button
                key={hook.name}
                onClick={() => setActiveHook(hook.name)}
                className={activeHook === hook.name ? 'active' : ''}
              >
                {hook.name}
              </button>
            ))}
          </nav>
        </header>
        
        <main>
          {ActiveComponent && <ActiveComponent />}
        </main>
      </div>
    
  );
}

export default App;