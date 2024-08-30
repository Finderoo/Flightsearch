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
      departure: formData.get('departure'),
      destination: formData.get('destination'),
      departureDate: formData.get('departureDate'),
      returnDate: formData.get('returnDate'),
      passengers: formData.get('passengers'),
    };

    try {
      const res = await fetch('/api/searchFlights', {
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
        <label htmlFor="departure">Departure City:</label>
        <input type="text" name="departure" required />

        <label htmlFor="destination">Destination City:</label>
        <input type="text" name="destination" required />

        <label htmlFor="departureDate">Departure Date:</label>
        <input type="date" name="departureDate" required />

        <label htmlFor="returnDate">Return Date (Optional):</label>
        <input type="date" name="returnDate" />

        <label htmlFor="passengers">Passengers:</label>
        <input type="number" name="passengers" min="1" required />

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
