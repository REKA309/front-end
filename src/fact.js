import React, { useState } from 'react';
import axios from 'axios';

const Fact = () => {
  const [fact, setFact] = useState('');
  const [factsList, setFactsList] = useState([]);

  const handleInputChange = (e) => {
    setFact(e.target.value);
  };

  const handleSubmit = () => {
    // Post the fact to the API
    axios.post('https://knowledge-k8k5.onrender.com/facts', { "factData":fact }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log(response.data); // Assuming the API returns the posted fact in the response
        setFact('');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const handleViewFacts = () => {
    // Fetch the facts from the API
    axios.get('https://knowledge-k8k5.onrender.com/allfacts')
      .then((response) => {
        console.log(response.data); // Assuming the API returns an array of facts
        setFactsList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='app-container'>

     <div className='input-container'>
     <input type="text" value={fact} placeholder='Enter Facts' onChange={handleInputChange} />
     </div>
      <div className='btn-container'>
      <button onClick={handleSubmit} className='btn btn-success'>Submit</button>
      <button onClick={handleViewFacts} className='btn btn-primary'>View Facts</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Facts</th>
          </tr>
        </thead>
        <tbody>
          {factsList.map((fact, index) => (
            <tr key={index}>
              <td>{index+1}.{fact.factData}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fact;
