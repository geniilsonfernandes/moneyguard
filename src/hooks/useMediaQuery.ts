import { useState, useEffect } from 'react';

type ScreenSize = 'sm' | 'md';

function useMediaQuery(size: ScreenSize): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    let query = '';

    if (size === 'sm') {
      query = '(max-width: 768px)';
    } else if (size === 'md') {
      query = '(min-width: 769px) and (max-width: 1024px)';
    }

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [size]);

  return matches;
}

export default useMediaQuery;
