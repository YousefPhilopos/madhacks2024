import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/testdata');
        setData(response.data); // Store the fetched data in state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">

        {/* Display fetched data */}
        <div style={{ marginTop: '20px' }}>
          <h2>Data from MongoDB</h2>
          <ul>
            {data.map((item) => (
              <li key={item._id}>
                <strong>{item.name}</strong>: {item.email}
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default App;
