import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

const Backdrop = params => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={params.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
