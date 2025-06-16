import React from 'react';

const Alert = ({ message, type = 'info' }) => {
  const alertClass = `alert alert-${type}`;

  return (
    <div className={alertClass} role="alert">
      {message}
    </div>
  );
};

export default Alert; 