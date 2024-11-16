import { useMemo, useRef, type DependencyList } from 'react';

// runs before useEffect & useLayoutEffect
export function useOnDepsChange<T extends unknown[]>(
  cb: ((...args: T) => void) | undefined,
  deps: DependencyList,
  ...args: T
) {
  const isOnMount = useRef(true);

  useMemo(() => {
    if (cb == undefined) return;

    if (isOnMount.current) {
      isOnMount.current = false;
      return;
    }
    cb(...args);
  }, deps);
}
