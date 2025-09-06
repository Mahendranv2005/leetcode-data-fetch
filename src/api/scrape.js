// File: api/scrape.js
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    // Fetch user profile page
    const profileUrl = `https://leetcode.com/${username}/`;
    const response = await fetch(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract data from the HTML
    const scriptContent = $('script').text();
    const dataMatch = scriptContent.match(/var pageData = ({.*?});/);

    if (!dataMatch) {
      throw new Error('Could not find user data in page');
    }

    const pageData = JSON.parse(dataMatch[1]);

    // Transform the data
    const result = {
      userProfile: {
        allQuestionsCount: [
          { difficulty: 'All', count: pageData.allQuestionsCount || 2750 },
          { difficulty: 'Easy', count: pageData.easyQuestions || 650 },
          { difficulty: 'Medium', count: pageData.mediumQuestions || 1400 },
          { difficulty: 'Hard', count: pageData.hardQuestions || 700 }
        ],
        matchedUser: {
          username: username,
          submitStats: {
            acSubmissionNum: [
              { difficulty: 'All', count: pageData.totalSolved || 0 },
              { difficulty: 'Easy', count: pageData.easySolved || 0 },
              { difficulty: 'Medium', count: pageData.mediumSolved || 0 },
              { difficulty: 'Hard', count: pageData.hardSolved || 0 }
            ]
          }
        }
      },
      recentProblems: pageData.recentSubmissions || []
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error scraping LeetCode data:', error);
    res.status(500).json({ error: 'Failed to fetch data from LeetCode' });
  }
}