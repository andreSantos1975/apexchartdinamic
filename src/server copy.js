



//Importa o módulo 'http' do Node.js e cria um novo servidor HTTP.
const server = require('http').createServer();

//Importa o módulo 'socket.io' e o utiliza para criar uma instância de Socket.IO no servidor HTTP 
//criado anteriormente. Este trecho também especifica que as opções de transporte 
//devem ser 'websocket' e 'polling'.
const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

const cors = require('cors');

// adiciona o middleware cors ao servidor
io.use(cors());
// 1. escuta conexões de soquete
//Cria um evento que é executado toda vez que um novo cliente se conecta ao servidor 
//Socket.IO. O parâmetro 'client' contém uma referência ao objeto do cliente que acabou de se conectar.
io.on('connection', client => {
  console.log('Cliente conectado:', client.id);
  //intervalId = null;
  const Binance = require('binance-api-node').default;
  const binanceClient = Binance();



  client.on('subscribeToTicker', ({ symbol, interval }) => {

    let timeoutId;
    const updateInterval = 3000; // Defina o intervalo de atualização em milissegundos
    const getPriceData = () => {
      binanceClient.candles({ symbol: symbol, interval: interval })
        .then(candles => {
          console.log(candles);
          let data = candles.map(candle => ({ x: candle.closeTime, y: candle.close }));
          client.emit('price', data);
        })
        .catch(error => {
          console.error('Erro ao obter candles', error);
        })
        .finally(() => {
          timeoutId = setTimeout(getPriceData, updateInterval);
        });
    };
    getPriceData(); // Inicializa a chamada da função getPriceData
    client.on('disconnect', () => {
      clearTimeout(timeoutId); // Limpa o timeout para evitar execuções desnecessárias
      console.log('Cliente desconectado:', client.id);
    });
  });


  client.on('disconnect', () => {
    console.log('Cliente desconectado:', client.id);
  });

});


server.listen(3000);
