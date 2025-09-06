// File: src/components/RecentProblems.js
import React from 'react';

const RecentProblems = ({ problems }) => {
  if (!problems || problems.length === 0) {
    return (
      <section className="progress-section">
        <h2>Recent Solved Problems</h2>
        <p>No recent submissions found</p>
      </section>
    );
  }

  return (
    <section className="progress-section">
      <h2>Recent Solved Problems</h2>
      <table className="problems-table">
        <thead>
          <tr>
            <th>Problem</th>
            <th>Date Solved</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => (
            <tr key={index}>
              <td>{problem.title}</td>
              <td>
                {new Date(parseInt(problem.timestamp) * 1000).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default RecentProblems;