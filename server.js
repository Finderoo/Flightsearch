const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
const axios = require('axios');

// Configurations
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected', () => console.log('MongoDB connected successfully.'));
db.on('error', (error) => console.error(`MongoDB connection error: ${error}`));

// AI API Setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// External API Integration for Flights and Packages
const FLIGHT_API_URL = process.env.FLIGHT_API_URL;
const FLIGHT_API_KEY = process.env.FLIGHT_API_KEY;
const PACKAGE_API_URL = process.env.PACKAGE_API_URL;
const PACKAGE_API_KEY = process.env.PACKAGE_API_KEY;

// API Routes
app.post('/api/itinerary', async (req, res) => {
  const { budget, destination, preferences } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Create a travel itinerary for a budget of $${budget} to ${destination} with preferences: ${preferences}`,
      max_tokens: 500,
    });
    res.status(200).json({ itinerary: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating itinerary' });
  }
});

app.get('/api/flights', async (req, res) => {
  const { origin, destination, date } = req.query;

  try {
    const response = await axios.get(`${FLIGHT_API_URL}/search`, {
      params: {
        origin,
        destination,
        date,
        apiKey: FLIGHT_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ error: 'Error fetching flight data' });
  }
});

app.get('/api/packages', async (req, res) => {
  const { destination, budget } = req.query;

  try {
    const response = await axios.get(`${PACKAGE_API_URL}/deals`, {
      params: {
        destination,
        budget,
        apiKey: PACKAGE_API_KEY,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching package data:', error);
    res.status(500).json({ error: 'Error fetching package data' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
