import { useEffect, useReducer } from 'react';
import { getCandle } from './utils';
//import useWebSocket from 'react-use-websocket';
import './App.css';
import ApexChart from './Chart';

const initialState = {
  data: [],
  isLoading: true,
  symbol: 'BTCUSDT',
  interval: '1m',
  update: 0,
  maxCandles: 60,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, isLoading: false };
    case 'SET_SYMBOL':
      return { ...state, symbol: action.payload, update: !state.update };
    case 'SET_INTERVAL':
      return { ...state, interval: action.payload, update: !state.update };
    case 'SET_MAX_CANDLES':
      return { ...state, maxCandles: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
console.log('Hello App')
  useEffect(() => {
    const intervalId = setInterval(() => {
      getCandle(state.symbol, state.interval)
        .then((candles) => {
          console.log('Testando candle do App', candles)
          if (candles.length > state.maxCandles) {
            candles.splice(0, candles.length - state.maxCandles);
          }
          console.log('Testando candle do App2:', candles);
          dispatch({ type: 'SET_DATA', payload: candles });
        })
        .catch((error) => {
          console.error('Erro ao obter candles', error);
        })
        .finally(() => {
          console.log('Promise finalizada');
        });
    }, 6000);
  
    return () => clearInterval(intervalId);
  }, [state.symbol, state.interval]);
  


 

  function onSymbolChange(event) {
    dispatch({ type: 'SET_SYMBOL', payload: event.target.value });
  }

  function onIntervalChange(event) {
    dispatch({ type: 'SET_INTERVAL', payload: event.target.value });
  }


  return (
    <div className="App">
      <select onChange={onSymbolChange} value={state.symbol}>
        <option value="BTCUSDT">BTCUSDT</option>
        <option value="ETHUSDT">ETHUSDT</option>
        <option value="ADAUSDT">ADAUSDT</option>
      </select>
  
      <select onChange={onIntervalChange} value={state.interval}>
        <option value="1m">1m</option>
        <option value="1d">1d</option>
        <option value="1w">1w</option>
      </select>
  
      {!state.isLoading && (
        <>
          <p>Data atual do App: {state.data.timestamp}</p>
          <ApexChart
            data={state.data}
            key={`${state.symbol}-${state.interval}-${state.update}`}
          />
        </>
      )}
      {state.isLoading && <p>Loading...</p>}
    </div>
  );
  
}


export default App;
