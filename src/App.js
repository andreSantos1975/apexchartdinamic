import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ApexChart from './Chart';

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('Conectado ao servidor');
});

socket.on('disconnect', () => {
  console.log('Desconectado do servidor');
});


const RealTimeCpuUsage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [interval, setInterval] = useState('1m');
  const [update, setUpdate] = useState(0); // novo estado para forçar atualização

  useEffect(() => {
    socket.on('price', priceData => {
      console.log('Recebido evento preço do servidor:', priceData);
      setData(currentData => [...currentData, priceData]);
    });
  }, []);

  useEffect(() => {
    function subscribeToTicker() {
      socket.emit('subscribeToTicker', { symbol, interval });
    }

    subscribeToTicker();
  }, [symbol, interval]);


  function onSymbolChange(event) {
    setSymbol(event.target.value);
    setUpdate(!update); // atualiza 'update' para forçar atualização
  }

  function onIntervalChange(event) {
    setInterval(event.target.value);
    setUpdate(!update); // adicionado para forçar atualização
  }

  return (
    <div>
      <h1>Real Time CPU Usage</h1>
      <div className="App">
        <select onChange={event => onSymbolChange(event)} value={symbol}>
          <option value="BTCUSDT">BTCUSDT</option>
          <option value="ETHUSDT">ETHUSDT</option>
          <option value="ADAUSDT">ADAUSDT</option>
        </select>

        <select onChange={event => onIntervalChange(event)} value={interval}>
          <option value="1m">1m</option>
          <option value="1d">1d</option>
          <option value="1w">1w</option>
        </select>

        {!isLoading && <ApexChart data={data} key={`${symbol}-${interval}-${update}`} />}
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
};


function App() {
  return (
    <div className="App">
      <RealTimeCpuUsage />
    </div>
  );
}

export default App;
