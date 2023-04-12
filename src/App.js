import { useEffect, useState } from 'react';
import { getCandle } from './utils';
import Candle from './Candle';
import useWebSocket from 'react-use-websocket';
import './App.css';
import ApexChart from './Chart';
//import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [interval, setInterval] = useState('1m');
  const [update, setUpdate] = useState(0); // novo estado para forçar atualização

  useEffect(() => {
    getCandle(symbol, interval)
      .then(data => {
        setData(data);
        setIsLoading(false);
        console.log('Data returned:', data); // adicionar o log aqui
      })
      .catch(err => {
        setIsLoading(false);
        alert(err.response ? err.response.data : err.message);
      });
  }, [symbol, interval, update]);
  

  const options = {
    onOpen: () => console.log('Connected to Binance'),
    onError: (err) => console.error(err),
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    onMessage: (event) => {
      const message = JSON.parse(event.data);
      console.log('Received message:', message);
      if (message.k) {
        const newCandle = new Candle(message.k.t, message.k.o, message.k.h, message.k.l, message.k.c);
        console.log('newCandle',newCandle);
        const newData = [...data];
        if (message.k.x === false) {
          newData[newData.length - 1] = newCandle;
        } else {
          newData.splice(0, 1);
          newData.push(newCandle);
        }
        setData(newData);
      }
    }
  };
  
  const { lastJsonMessage } = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`, options);
  


  function onSymbolChange(event) {
    setSymbol(event.target.value);
    setUpdate(!update); // atualiza 'update' para forçar atualização
  }

  function onIntervalChange(event) {
    setInterval(event.target.value);
    setUpdate(!update); // adicionado para forçar atualização
  }


  return (
    <div className="App">
      <select onChange={onSymbolChange} value={symbol}>
        <option value="BTCUSDT">BTCUSDT</option>
        <option value="ETHUSDT">ETHUSDT</option>
        <option value="ADAUSDT">ADAUSDT</option>
      </select>

      <select onChange={onIntervalChange} value={interval}>
        <option value="1m">1m</option>
        <option value="1d">1d</option>
        <option value="1w">1w</option>
      </select>

      {!isLoading && <ApexChart data={data} key={`${symbol}-${interval}-${update}`} />}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default App;
