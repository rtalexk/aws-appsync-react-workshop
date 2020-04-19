import './App.css';

import React, { useEffect, useState } from 'react';

import { API, graphqlOperation } from 'aws-amplify';

import { listTalks } from './graphql/queries';

function App() {
  const [talks, setTalks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const talksData = await API.graphql(graphqlOperation(listTalks));
      console.log(talksData);
      setTalks(talksData.data.listTalks.items);
    } catch (error) {
      console.log('Error fetching talks');
      console.log(error);
    }
  }

  return (
    <div className="app-container">
      <div className="talks">
        {talks.map(talk => (
          <div className="talk" key={talk.key}>
            <h3>{ talk.speakerName }</h3>
            <h5>{ talk.name }</h5>
            <p>{ talk.description }</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
