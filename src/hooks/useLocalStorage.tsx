import { useState } from "react";

export const useLocalStorage = (keyName: string, defaultValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue: string): void => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (error: any) {
      console.log(error.message);
    }
    setStoredValue(newValue);
  };
  
  return [storedValue, setValue];
};
