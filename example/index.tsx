import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useFetch } from '../.';

function Input() {
  const [input, setInput] = React.useState('');

  const API = 'https://pokeapi.co/api/v2/';
  const { response, loading, fetchy } = useFetch(API.concat(input), {});

  function handleClick() {
    fetchy();
  }

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <input
          name="input"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={handleClick}>Fetch</button>
      </div>
      <div style={{ maxWidth: '50%', margin: '0 auto' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          response && <div>{JSON.stringify(response, null, 4)}</div>
        )}
      </div>
    </>
  );
}

export default function App() {
  const [showInput, setShowInput] = React.useState(true);
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: '0 auto',
      }}
    >
      <button onClick={() => setShowInput(!showInput)}>Handle Input</button>
      {showInput && <Input />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
