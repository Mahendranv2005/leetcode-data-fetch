// File: src/App.js
import React, { useState } from 'react';
import './App.css';
import UserInput from './components/UserInput';
import StatsGrid from './components/StatsGrid';
import ProgressSection from './components/ProgressSection';
import RecentProblems from './components/RecentProblems';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchUserData } from './services/leetcodeApi';

function App() {
  const [userData, setUserData] = useState(null);
  const [recentProblems, setRecentProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFetchData = async (username) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchUserData(username);
      setUserData(data.userProfile);
      setRecentProblems(data.recentProblems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">💻</span>
          <h1>LeetCode Progress Tracker</h1>
        </div>
      </header>

      <div className="container">
        <UserInput onFetchData={handleFetchData} />
        
        {error && <ErrorMessage message={error} />}
        
        <LoadingSpinner visible={loading} />
        
        {userData && (
          <>
            <StatsGrid userData={userData} />
            <ProgressSection userData={userData} />
            <RecentProblems problems={recentProblems} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;