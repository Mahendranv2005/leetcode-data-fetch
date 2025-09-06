// File: src/components/ProgressSection.js
import React from 'react';

const ProgressSection = ({ userData }) => {
  const { allQuestionsCount, matchedUser } = userData;
  const { acSubmissionNum } = matchedUser.submitStats;
  
  const totalProblems = allQuestionsCount.find(q => q.difficulty === 'All').count;
  const totalSolved = acSubmissionNum.find(q => q.difficulty === 'All').count;
  const progressPercentage = ((totalSolved / totalProblems) * 100).toFixed(1);

  return (
    <section className="progress-section">
      <h2>Overall Progress</h2>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p>{progressPercentage}% of all problems solved</p>
    </section>
  );
};

export default ProgressSection;