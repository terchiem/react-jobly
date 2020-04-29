import { useState } from 'react';

/** 
 * Custom hook to store state in localStorage. Takes a key which will
 * be used to access localStorage.
 */

function useLocalStorage(key) {
  const storedData = window.localStorage.getItem(key) || null;
  const [data, setData] = useState(storedData);

  function updateData(value) {
    setData(value);
    window.localStorage.setItem(key, value);
  }

  function removeData() {
    setData(null);
    window.localStorage.removeItem(key);
  }

  return [data, updateData, removeData];
}

export default useLocalStorage;