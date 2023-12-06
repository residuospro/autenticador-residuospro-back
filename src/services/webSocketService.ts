import { Request } from "express";
import { Server as httpServer } from "http";
import { Server } from "socket.io";

class WebSocketService {
  static configureWebSocket(server: httpServer): any {
    const io = new Server(server, {
      cors: {
        origin: process.env.FRONT_REDISUOS_PRO,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });

    let token: string;

    io.on("connection", (socket) => {
      token = socket.handshake.headers.authorization;

      console.log("a user connected");
    });

    return { io, token };
  }

  static async createEvent(req: Request, response: any, event: string) {
    const socket = req.io;

    const { idCompany, idDepartment } = req.body;

    const item = response.item;
    const totalPages = response.totalPages;

    socket.emit(event, {
      item,
      totalPages,
      idCompany,
      idDepartment,
    });
  }
}

export default WebSocketService;
