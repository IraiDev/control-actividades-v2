import { useCallback, useState } from 'react';
const useChangeTab = (initialState = false) => {

  const [state, setState] = useState(initialState);
  const toggleTrue = useCallback(() => setState(true), []);
  const toggleFalse = useCallback(() => setState(false), []);

  return [state, toggleTrue, toggleFalse]
}

export default useChangeTab