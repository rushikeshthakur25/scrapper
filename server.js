const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint to scrape a URL
app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    // Check if URL is provided
    if (!url) {
      throw new Error('URL parameter is required.');
    }

    // Make a request to the provided URL
    const response = await axios.get(url);

    // Extract necessary data from the response
    const data = {
      status: response.status,
      headers: response.headers,
      body: response.data
    };

    // Send the data back as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error.message);

    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request data:', error.request);
      res.status(500).json({ error: 'No response received' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
