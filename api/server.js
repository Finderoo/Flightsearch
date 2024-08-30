// server.js (Backend)
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to fetch flights
app.post('/api/search-flights', async (req, res) => {
  const { departure, destination, departureDate, returnDate, passengers } = req.body;

  const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${departure}&destinationSkyId=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${passengers}&currency=AUD&locale=en-AU&market=en-AU&countryCode=AU`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f09cf367d3msh4ccd0c03ce4c3dap14ac65jsn9ff16862b64d',
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching flight data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
