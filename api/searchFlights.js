// pages/api/searchFlights.js
export default async function handler(req, res) {
  const { departure, destination, departureDate, returnDate, passengers } = req.body;

  const apiUrl = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${departure}&destinationSkyId=${destination}&originEntityId=27544008&destinationEntityId=27537542&cabinClass=economy&adults=${passengers}&sortBy=best&currency=AUD&market=en-AU&countryCode=AU`;

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f09cf367d3msh4ccd0c03ce4c3dap14ac65jsn9ff16862b64d',
      'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(apiUrl, options);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ error: 'Error fetching flight data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
