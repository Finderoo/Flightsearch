// api/searchFlights.js
const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { departure, destination, departureDate, returnDate, passengers } = req.body;

  const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${departure}&destinationSkyId=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${passengers}&currency=AUD&locale=en-AU&market=en-AU&countryCode=AU`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching flight data');
  }
}
