import { useEffect } from 'react';

function usePreventRefresh() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'r' && (e.ctrlKey || e.metaKey)) || e.key === 'F5') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}

export default usePreventRefresh;
