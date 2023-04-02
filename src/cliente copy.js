import io from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

//Este trecho de código cria uma conexão do cliente Socket.IO com o servidor Socket.IO 
//em 'http://localhost:3000' e especifica que ele deve usar 'websocket' ou 'polling' 
//como meio de transporte.
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling']
});

const App = ({}) => {
  const [data, setData] = useState([]);
// 1. escuta um evento cpu e atualiza o estado
  useEffect(() => {
    //A função de retorno de chamada recebe um único parâmetro, que é a carga útil
    // de dados do evento 'cpu' emitido a partir do servidor. Essa carga útil é um 
    //objeto JavaScript que contém as informações sobre o uso da CPU. Essa função
    // pode ser usada para atualizar o estado do aplicativo com os dados recebidos 
    //do servidor Socket.IO.
    socket.on('cpu', cpuPercent => {
      setData(currentData => [...currentData, cpuPercent]);
    });
  }, []);

 // 2. renderiza o gráfico de linhas usando o estado
  return (
    <div>
      <h1>Real Time CPU Usage</h1>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));