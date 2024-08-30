// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [results, setResults] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchData = {
      departure: formData.get('departure'),
      destination: formData.get('destination'),
      departureDate: formData.get('departureDate'),
      returnDate: formData.get('returnDate'),
      passengers: formData.get('passengers')
    };

    const res = await fetch('/api/searchFlights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchData),
    });

    const data = await res.json();
    setResults(data);
  }

  return (
    <div>
      <h1>Find Cheap Flights</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="departure" placeholder="Departure City" required />
        <input type="text" name="destination" placeholder="Destination City" required />
        <input type="date" name="departureDate" required />
        <input type="date" name="returnDate" />
        <input type="number" name="passengers" placeholder="Passengers" min="1" required />
        <button type="submit">Search Flights</button>
      </form>
      {results && (
        <div>
          <h2>Flight Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
