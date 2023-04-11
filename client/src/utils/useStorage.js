import { useCallback, useMemo, useState } from "react";

export const useStorage = (storageType, key) => {
  const [state, setState] = useState(false);
  const storages = {
    LOCAL_STORAGE: localStorage,
    SESSION_STORAGE: sessionStorage,
  };
  const storage = storages[storageType];

  const value = useMemo(() => storage.getItem(key), [storage, key, state]);
  const setValue = useCallback(
    (value) => {
      storage.setItem(key, value);
      setState((prev) => !prev);
    },
    [storage, setState]
  );

  return [value, setValue];
};
