const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Socket.IO Server');
});

const io = require('socket.io')(server, {
  cors: {
    origin: "*", // Allows requests from any origin
    methods: ["GET", "POST"],
  }
});


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('App\\Events\\MyEvent', (data) => {
    // Broadcast the event to all connected clients
    io.emit('App\\Events\\MyEvent', data);
  });
  
  socket.on('test_message', (data) => {
    console.log('Message from client:', data);
    socket.emit('test_response', {data: 'Hi, Client!'});
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(6001, () => {
  console.log('Server is running on port 6001');
});
