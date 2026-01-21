import { useEffect, useState } from 'react';

export function useMounted() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  return isMounted;
}
