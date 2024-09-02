import React, { useState, useEffect } from 'react';

const DesktopOnly = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isDesktop) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Desktop Only</h1>
        <p>This website is only accessible on desktop devices. Please visit on a larger screen.</p>
      </div>
    );
  }

  return children;
};

export default DesktopOnly;
