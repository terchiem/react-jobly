import { useState, useEffect } from 'react';

/** 
 * Custom hook to store state in localStorage. Takes a key which will
 * be used to access localStorage.
 */

function useLocalStorage(key, initialValue) {
  const currentValue = localStorage.getItem(key) || initialValue;
  const [data, setData] = useState(currentValue);

  useEffect(() => {
    if (!data) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, data);
    }
  }, [data, key]);

  return [data, setData];
}

export default useLocalStorage;