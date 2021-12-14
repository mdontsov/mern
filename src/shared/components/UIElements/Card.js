import React from 'react';

import './Card.css';

const Card = params => {
  return (
    <div className={`card ${params.className}`} style={params.style}>
      {params.children}
    </div>
  );
};

export default Card;
