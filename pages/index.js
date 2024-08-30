// pages/index.js
import React, { useState } from 'react';

export default function Home() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.target);

    const searchData = {
      origin: formData.get('origin'),
      destination: formData.get('destination'),
      departureDate: formData.get('departureDate'),
    };

    try {
      const res = await fetch('/api/amadeus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchData),
      });

      const data = await res.json();

      if (res.ok) {
        setResults(data);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Find Cheap Flights</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="origin">Origin:</label>
        <input type="text" name="origin" required />

        <label htmlFor="destination">Destination:</label>
        <input type="text" name="destination" required />

        <label htmlFor="departureDate">Departure Date:</label>
        <input type="date" name="departureDate" required />

        <button type="submit">Search Flights</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {results && (
        <div>
          <h2>Flight Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
