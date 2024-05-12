const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["*"],
    credentials: true
  }
});

app.use(express.json());

const apiRouter = require('./routes/api')(io); 

app.use(cors()); // This enables CORS for all routes
app.use('/api', apiRouter);


// // Test API
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'Test API is working' });
// });

server.listen(6001, () => {
  console.log('Server is running on port 6001');
});