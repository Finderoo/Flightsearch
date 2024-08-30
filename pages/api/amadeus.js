// pages/api/amadeus.js

import axios from 'axios';

const amadeusClientId = process.env.AMADEUS_API_KEY; // Store your API key in environment variables
const amadeusClientSecret = process.env.AMADEUS_API_SECRET; // Store your API secret in environment variables

export default async function handler(req, res) {
  try {
    // Step 1: Get an access token from Amadeus
    const authResponse = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', {
      grant_type: 'client_credentials',
      client_id: amadeusClientId,
      client_secret: amadeusClientSecret,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = authResponse.data;

    // Step 2: Use the access token to search for flights
    const { origin, destination, departureDate } = req.body; // Assuming these are passed in the request body

    const flightSearchResponse = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: departureDate,
        adults: 1,
        currencyCode: 'AUD',
        max: 10,
      },
    });

    res.status(200).json(flightSearchResponse.data);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
}
