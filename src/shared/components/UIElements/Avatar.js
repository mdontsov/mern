import React from 'react';

import './Avatar.css';

const Avatar = params => {
  return (
    <div className={`avatar ${params.className}`} style={params.style}>
      <img
        src={params.image}
        alt={params.alt}
        style={{ width: params.width, height: params.width }}
      />
    </div>
  );
};

export default Avatar;
