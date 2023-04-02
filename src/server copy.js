//Importa o módulo 'http' do Node.js e cria um novo servidor HTTP.
const server = require('http').createServer();
//Importa o módulo 'os-utils', que fornece informações de uso do sistema operacional.
const os = require('os-utils');
//Importa o módulo 'socket.io' e o utiliza para criar uma instância de Socket.IO no servidor HTTP 
//criado anteriormente. Este trecho também especifica que as opções de transporte 
//devem ser 'websocket' e 'polling'.
const io = require('socket.io')(server, {
  transports: ['websocket', 'polling']
});

let tick = 0;
// 1. escuta conexões de soquete
//Cria um evento que é executado toda vez que um novo cliente se conecta ao servidor 
//Socket.IO. O parâmetro 'client' contém uma referência ao objeto do cliente que acabou de se conectar.
io.on('connection', client => {
  //Cria um temporizador que executa uma função a cada 1 segundo.
  setInterval(() => {
    // 2. a cada segundo, emite um evento 'cpu' para o usuário
    os.cpuUsage(cpuPercent => {
      //Emite um evento para o cliente com o nome 'cpu' contendo um objeto
      // que possui duas propriedades: 'name' e 'value'. A propriedade 'name' é um 
      //contador que é incrementado a cada emissão de evento, e a propriedade 'value' 
      //é a porcentagem de uso da CPU obtida anteriormente.
      client.emit('cpu', {
        name: tick++,
        value: cpuPercent
      });
    });
  }, 1000);
});

server.listen(3000);
