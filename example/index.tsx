import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useFetch, FetchCacheProvider, cache } from '../.';

function Input() {
  const [input, setInput] = React.useState('');

  const API = 'https://pokeapi.co/api/v2/';
  const { response, loading, fetchy } = useFetch(API.concat(input), {});

  function handleClick() {
    fetchy();
  }

  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}
      >
        <div
          style={{
            marginBottom: '20px',
            maxWidth: '50%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <input
            name="input"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button onClick={handleClick}>Fetch</button>
        </div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            response && <div>{JSON.stringify(response, null, 4)}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [showInput, setShowInput] = React.useState(true);
  return (
    <FetchCacheProvider cache={cache}>
      <div
        className="App"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '80%',
          margin: '0 auto',
        }}
      >
        <button onClick={() => setShowInput(!showInput)}>Handle Input</button>
        <div
          style={{
            display: 'flex',
            marginTop: '20px',
            justifyContent: 'space-between',
          }}
        >
          {showInput && <Input />}
          {showInput && <Input />}
        </div>
      </div>
    </FetchCacheProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
