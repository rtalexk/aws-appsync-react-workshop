import './App.css';

import React, { useEffect, useReducer } from 'react';

import { API, graphqlOperation } from 'aws-amplify';

import { v4 as uuid } from 'uuid';

import { listTalks as ListTalks } from './graphql/queries';
import { createTalk as CreateTalk } from './graphql/mutations';
import { onCreateTalk as OnCreateTalk } from './graphql/subscriptions';

const CLIENT_ID = uuid();

const initialState = {
  description: '',
  name: '',
  speakerBio: '',
  speakerName: '',
  talks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TALKS':
      return { ...state, talks: action.talks };

    case 'SET_INPUT':
      return { ...state, [action.key]: action.value };

    case 'CLEAR_INPUT':
      return { ...initialState, talks: state.talks };

    case 'ADD_TALK':
      return { ...state, talks: [...state.talks, action.talk] };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    listTalks();

    const subscription = API.graphql(graphqlOperation(OnCreateTalk)).subscribe({
      next: eventData => {
        const talk = eventData.value.data.onCreateTalk;
        dispatch({ type: 'ADD_TALK', talk });
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  async function listTalks() {
    try {
      const talksData = await API.graphql(graphqlOperation(ListTalks));
      console.log(talksData);
      dispatch({ type: 'SET_TALKS', talks: talksData.data.listTalks.items });
    } catch (error) {
      console.log('Error fetching talks');
      console.log(error);
    }
  }

  async function createTalk() {
    const { description, name, speakerBio, speakerName } = state;

    if (![description, name, speakerBio, speakerName].some(Boolean)) {
      return;
    }

    const talk = { clientId: CLIENT_ID, description, name, speakerBio, speakerName };

    try {
      await API.graphql(graphqlOperation(CreateTalk, { input: talk }));
    } catch (error) {
      console.log('Error creating talk');
      console.log(error);
    }
  }

  function onTalkFormInputChange(e) {
    const { name: key, value } = e.target;

    dispatch({ type: 'SET_INPUT', key, value });
  }

  return (
    <div className='app-container'>
      <div className='form-talk'>
        <input
          name='name'
          onChange={onTalkFormInputChange}
          placeholder='Talk Name'
          value={state.name}
        />
        <input
          name='description'
          onChange={onTalkFormInputChange}
          placeholder='Talk Description'
          value={state.description}
        />
        <input
          name='speakerName'
          onChange={onTalkFormInputChange}
          placeholder='Speaker Name'
          value={state.speakerName}
        />
        <input
          name='speakerBio'
          onChange={onTalkFormInputChange}
          placeholder='Speaker Bio'
          value={state.speakerBio}
        />
        <button onClick={createTalk}>Create Talk</button>
      </div>

      <div className='talks'>
        {state.talks.map(talk => (
          <div className='talk' key={talk.id}>
            <h3>{talk.speakerName}</h3>
            <h5>{talk.name}</h5>
            <p>{talk.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
