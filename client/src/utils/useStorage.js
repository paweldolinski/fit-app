import { useCallback, useMemo, useState } from "react";

export const useLocalStorage = (keyName) => {
  const [state, setState] = useState(false);

  const value = useMemo(() => {
    localStorage.getItem(keyName);
  }, [keyName, state]);

  const setValue = useCallback(
    (value) => {
      localStorage.setItem(keyName, JSON.stringify(value));
      setState((prev) => !prev);
    },
    [setState]
  );

  return [value, setValue];
};
