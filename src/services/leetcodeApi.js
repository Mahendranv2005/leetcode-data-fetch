// File: src/services/leetcodeApi.js

// Using a serverless function as proxy
const PROXY_URL = 'https://your-vercel-deployment.vercel.app/api/leetcode';

export const fetchUserData = async (username) => {
  try {
    const response = await fetch(`${PROXY_URL}?username=${username}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data. Please try again later.');
  }
};