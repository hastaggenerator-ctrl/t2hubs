import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDB } from './config/db.js';
import { corsOptions } from './config/cors.js';

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions
});

io.on('connection', (socket) => {
  socket.on('join', (room = 'support') => socket.join(room));
  socket.on('typing', (payload) => socket.to(payload.room || 'support').emit('chat:typing', payload));
});

app.set('io', io);

connectDB()
  .then(() => server.listen(port, () => console.log(`API running on port ${port}`)))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
