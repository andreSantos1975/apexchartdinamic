import Candle from './Candle';
import io from 'socket.io-client';




const socket = io('http://localhost:3000');



export function getCandle(symbol, interval) {
  //A função usa a classe Promise para lidar com a assincronia 
  //da conexão do socket.io e retornar os dados de vela (candles)
  // recebidos para o chamador da função. Quando a promessa é 
  //resolvida, a função retorna as velas (candles) em forma de matriz.
  return new Promise((resolve, reject) => {
    socket.emit('subscribeToTicker', { symbol, interval });
    socket.on('price', candleData => {
      const candles = candleData.map(candleArr => {
        return new Candle(candleArr[0], candleArr[1], candleArr[2], candleArr[3], candleArr[4]);
      });
      console.log('candles', candles)
      resolve(candles);
    });
    socket.on('error', error => {
      reject(error);
    });
  });
}
