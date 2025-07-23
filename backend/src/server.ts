import app from './app';
import { Server } from 'socket.io';
import { WebSocketService } from './services/WebSocketService';

const PORT = process.env.PORT || 3001;

// Inicializar o servidor HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Criar o servidor WebSocket
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Inicializar o WebSocketService
const webSocketService = new WebSocketService(io);

// Exportar o serviço WebSocket para uso em outros lugares
export { webSocketService };