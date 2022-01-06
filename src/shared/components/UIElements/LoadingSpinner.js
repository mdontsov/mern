import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = params => {
  return (
    <div className={`${params.asOverlay && 'loading-spinner-overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default LoadingSpinner;
