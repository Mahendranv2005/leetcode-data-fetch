// File: src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Fetching your LeetCode data...</p>
    </div>
  );
};

export default LoadingSpinner;