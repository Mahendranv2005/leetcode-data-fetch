// File: src/components/StatsGrid.js
import React from 'react';

const StatsGrid = ({ userData }) => {
  const { allQuestionsCount, matchedUser } = userData;
  const { acSubmissionNum } = matchedUser.submitStats;
  
  const totalProblems = allQuestionsCount.find(q => q.difficulty === 'All').count;
  const totalEasy = allQuestionsCount.find(q => q.difficulty === 'Easy').count;
  const totalMedium = allQuestionsCount.find(q => q.difficulty === 'Medium').count;
  const totalHard = allQuestionsCount.find(q => q.difficulty === 'Hard').count;
  
  const totalSolved = acSubmissionNum.find(q => q.difficulty === 'All').count;
  const easySolved = acSubmissionNum.find(q => q.difficulty === 'Easy').count;
  const mediumSolved = acSubmissionNum.find(q => q.difficulty === 'Medium').count;
  const hardSolved = acSubmissionNum.find(q => q.difficulty === 'Hard').count;

  return (
    <section className="stats-grid">
      <div className="stat-card">
        <div className="stat-label">Total Problems Solved</div>
        <div className="stat-value">{totalSolved}</div>
        <div className="stat-label">out of {totalProblems}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Easy Solved</div>
        <div className="stat-value">{easySolved}</div>
        <div className="stat-label">out of {totalEasy}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Medium Solved</div>
        <div className="stat-value">{mediumSolved}</div>
        <div className="stat-label">out of {totalMedium}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Hard Solved</div>
        <div className="stat-value">{hardSolved}</div>
        <div className="stat-label">out of {totalHard}</div>
      </div>
    </section>
  );
};

export default StatsGrid;