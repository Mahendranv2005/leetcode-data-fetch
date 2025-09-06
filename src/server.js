const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/leetcode', async (req, res) => {
  const { username } = req.query;
  
  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({
        query: `
          query getUserProfile($username: String!) {
            allQuestionsCount { difficulty count }
            matchedUser(username: $username) {
              username
              submitStats { acSubmissionNum { difficulty count } }
            }
            recentAcSubmissionList(username: $username, limit: 10) {
              title
              titleSlug
              timestamp
            }
          }
        `,
        variables: { username }
      })
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});