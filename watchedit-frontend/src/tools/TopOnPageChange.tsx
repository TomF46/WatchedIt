import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scroll to top on page change as default behaviour of react router can lead to pages loading halfway down.
const ScrollTopOnPageChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <></>;
};

export default ScrollTopOnPageChange;
