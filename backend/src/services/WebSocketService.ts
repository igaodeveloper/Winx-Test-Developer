import { Server } from 'socket.io';

export class WebSocketService {
  private io: Server;

  constructor(private server: any) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    this.setupListeners();
  }

  private setupListeners() {
    this.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  broadcastProductUpdate() {
    this.io.emit('productUpdate');
  }
}
