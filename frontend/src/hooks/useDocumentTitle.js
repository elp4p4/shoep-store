import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title = 'Shoep Store';
    };
  }, [title]);
};

export default useDocumentTitle;