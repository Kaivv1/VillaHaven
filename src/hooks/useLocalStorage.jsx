import { useEffect } from "react";
import { useState } from "react";

export const useLocalStorage = (objValue, key) => {
  const [value, setValue] = useState(() => {
    const storageValue = localStorage.getItem(key);
    return storageValue ? JSON.parse(storageValue) : objValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
