import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [budget, setBudget] = useState('');
  const [destination, setDestination] = useState('');
  const [preferences, setPreferences] = useState('');
  const [itinerary, setItinerary] = useState('');
  const [flights, setFlights] = useState([]);
  const [packages, setPackages] = useState([]);

  const fetchItinerary = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/itinerary', {
        budget,
        destination,
        preferences,
      });
      setItinerary(response.data.itinerary);
    } catch (error) {
      console.error('Error fetching itinerary', error);
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flights', {
        params: {
          origin: 'SYD',
          destination,
          date: '2024-12-25',
        },
      });
      setFlights(response.data);
    } catch (error) {
      console.error('Error fetching flights', error);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packages', {
        params: {
          destination,
          budget,
        },
      });
      setPackages(response.data);
    } catch (error) {
      console.error('Error fetching packages', error);
    }
  };

  return (
    <div className="app" style={{ backgroundColor: '#ebf6fc', color: '#000' }}>
      <h1 style={{ color: '#F7ea54' }}>Finderoo: Your Travel Companion</h1>
      <div style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          style={{ margin: '5px', padding: '10px', borderRadius: '5px', border: '1px solid #000' }}
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={{ margin: '5px', padding: '10px', borderRadius: '5px', border: '1px solid #000' }}
        />
        <textarea
          placeholder="Preferences (e.g., adventure, beaches)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          style={{ margin: '5px', padding: '10px', borderRadius: '5px', border: '1px solid #000' }}
        ></textarea>
      </div>
      <div style={{ margin: '20px 0' }}>
        <button onClick={fetchItinerary} style={{ backgroundColor: '#F7ea54', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>Generate Itinerary</button>
        <button onClick={fetchFlights} style={{ backgroundColor: '#F7ea54', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>Find Flights</button>
        <button onClick={fetchPackages} style={{ backgroundColor: '#F7ea54', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>Find Packages</button>
      </div>
      {itinerary && (
        <div className="itinerary" style={{ backgroundColor: '#FFF', padding: '15px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', margin: '10px 0' }}>
          <h2>Your Itinerary:</h2>
          <p>{itinerary}</p>
        </div>
      )}
      {flights.length > 0 && (
        <div className="flights" style={{ backgroundColor: '#FFF', padding: '15px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', margin: '10px 0' }}>
          <h2>Available Flights:</h2>
          <ul>
            {flights.map((flight, index) => (
              <li key={index}>{flight.details}</li>
            ))}
          </ul>
        </div>
      )}
      {packages.length > 0 && (
        <div className="packages" style={{ backgroundColor: '#FFF', padding: '15px', borderRadius: '5px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', margin: '10px 0' }}>
          <h2>Available Packages:</h2>
          <ul>
            {packages.map((pkg, index) => (
              <li key={index}>{pkg.details}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
