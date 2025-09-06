// File: api/leetcode.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // GraphQL query to get user data
    const graphqlQuery = {
      query: `
        query getUserProfile($username: String!) {
          allQuestionsCount {
            difficulty
            count
          }
          matchedUser(username: $username) {
            username
            submitStats {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
              reputation
              starRating
            }
          }
          recentAcSubmissionList(username: $username, limit: 20) {
            title
            titleSlug
            timestamp
          }
        }
      `,
      variables: { username }
    };

    // Make request to LeetCode GraphQL API
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      body: JSON.stringify(graphqlQuery)
    });

    if (!response.ok) {
      throw new Error(`LeetCode API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      return res.status(404).json({ error: 'User not found or data unavailable' });
    }

    // Transform the data
    const result = {
      userProfile: {
        allQuestionsCount: data.data.allQuestionsCount,
        matchedUser: data.data.matchedUser
      },
      recentProblems: data.data.recentAcSubmissionList || []
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    res.status(500).json({ error: 'Failed to fetch data from LeetCode' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}