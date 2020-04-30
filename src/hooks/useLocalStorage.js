import { useState, useEffect } from 'react';

/** 
 * Custom hook to store state in localStorage. Takes a key which will
 * be used to access localStorage.
 */

function useLocalStorage(key) {
  const storedData = window.localStorage.getItem(key) || null;
  const [data, setData] = useState(storedData);

  useEffect(() => {
    window.localStorage.setItem(key, data);
  }, [data]);

  function removeData() {
    setData(null);
    window.localStorage.removeItem(key);
  }

  return [data, setData, removeData];
}

export default useLocalStorage;