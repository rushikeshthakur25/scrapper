import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrapingInfo, setScrapingInfo] = useState(null); // State to hold user scraping information

  const handleScrape = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Make a request to the server endpoint with the provided URL
      const response = await axios.post('http://localhost:5000/api/scrape', { url });
      setResponse(response.data);
      setScrapingInfo({ url }); // Store user scraping information (e.g., URL)
    } catch (error) {
      setError(error.response?.data?.error || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const showInfoAlert = () => {
    alert('This tool is for educational purposes only. Use responsibly.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-orange-700 p-4">
        <div className="container mx-auto">
          <span className="text-white text-2xl font-bold">Web Scraper</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto flex-grow py-8 flex">
        {/* Left Side (Sample Response Data) */}
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Sample Response Data:</h2>
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Status: 200</p>
            <p>Headers: {"{\"Content-Type\":\"text/html\",\"Server\":\"Apache\"}"}</p>
            <p>Body: <html>
                      <body>
                        <h1>Sample Website</h1>
                        <p>This is a sample webpage for scraping.</p>
                        <script src="https://example.com/script.js"></script>
                        <ul>
                          <li><a href="https://example.com/hidden-link">Hidden Link</a></li>
                        </ul>
                        <p>Parameters: {`"param1": "value1", "param2": "value2"`}</p>
                      </body>
                    </html></p>
          </div>
        </div>

        {/* Right Side (Scraper Tool Interface and Information) */}
        <div className="w-1/2 p-4">
          <div className="bg-white p-8 rounded shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-green-600">Welcome to the Web Scraper Tool!</h1>
            <p className="text-gray-600 mb-4">
              This tool allows you to scrape data from websites. Enter the URL of the website you want to scrape below.
            </p>
            <input
              type="text"
              className="border border-gray-300 p-3 w-full rounded"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleScrape}
              disabled={loading || !url}
            >
              {loading ? 'Scraping...' : 'Scrape'}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 ml-2"
              onClick={showInfoAlert}
            >
              Info
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {response && (
              <div className="mt-6 bg-gray-200 p-4 rounded">
                <h2 className="text-xl font-semibold mb-4">Scraped Data:</h2>
                <p>Status: {response.status}</p>
                <p>Headers: {JSON.stringify(response.headers)}</p>
                <p>Body: {response.body}</p>
              </div>
            )}
          </div>

          {/* Display User Scraping Information */}
          {scrapingInfo && (
            <div className="mt-6 bg-white p-4 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-4">User Scraping Information:</h2>
              <p>URL: {scrapingInfo.url}</p>
              {/* Add more fields if needed */}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-orange-700 text-white text-center py-4">
        <div className="container mx-auto">
          <p className="text-sm">This tool is for educational purposes only. Use responsibly.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
