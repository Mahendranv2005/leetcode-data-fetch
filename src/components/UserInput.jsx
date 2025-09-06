// File: src/components/UserInput.js
import React, { useState } from 'react';

const UserInput = ({ onFetchData }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onFetchData(username.trim());
    }
  };

  return (
    <section className="user-input-section">
      <h2>Enter Your LeetCode Username</h2>
      <form onSubmit={handleSubmit} className="input-group">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. mahendranv2005"
        />
        <button type="submit">Fetch Progress</button>
      </form>
    </section>
  );
};

export default UserInput;