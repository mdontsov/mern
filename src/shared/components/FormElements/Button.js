import React from 'react';
import { Link } from 'react-router-dom';

import './Button.css';

const Button = params => {
  if (params.href) {
    return (
      <a
        className={`button button--${params.size || 'default'} ${params.inverse &&
          'button--inverse'} ${params.danger && 'button--danger'}`}
        href={params.href}
      >
        {params.children}
      </a>
    );
  }
  if (params.to) {
    return (
      <Link
        to={params.to}
        exact={params.exact}
        className={`button button--${params.size || 'default'} ${params.inverse &&
          'button--inverse'} ${params.danger && 'button--danger'}`}
      >
        {params.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${params.size || 'default'} ${params.inverse &&
        'button--inverse'} ${params.danger && 'button--danger'}`}
      type={params.type}
      onClick={params.onClick}
      disabled={params.disabled}
    >
      {params.children}
    </button>
  );
};

export default Button;
