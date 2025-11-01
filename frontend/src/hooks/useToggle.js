// hooks/useToggle.js
import { useState, useCallback } from 'react';

export const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(prevValue => !prevValue);
  }, []);
  
  const setOn = useCallback(() => {
    setValue(true);
  }, []);
  
  const setOff = useCallback(() => {
    setValue(false);
  }, []);
  
  return [value, toggle, setOn, setOff];
};