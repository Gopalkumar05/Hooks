// hooks/useEventListener.js
import { useEffect, useRef } from 'react';

export const useEventListener = (eventType, handler, element = window) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => handlerRef.current(event);
    
    element.addEventListener(eventType, eventListener);
    
    return () => {
      element.removeEventListener(eventType, eventListener);
    };
  }, [eventType, element]);
};