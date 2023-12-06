import express from "express";
import dotenv from "dotenv";
import router from "./routers";
import http from "http";
import dbConnection from "./config/dbConfig";
import WebSocketService from "./services/webSocketService";

dotenv.config();

const app = express();
const server = http.createServer(app);
const { io, token } = WebSocketService.configureWebSocket(server);

app.set("io", io);

app.set("token", token);

router(app);

dbConnection.on("error", console.log.bind("Error ao conectar-se com o banco"));
dbConnection.once("open", () =>
  console.log("A conexão com o banco foi realizada com sucesso")
);

server.listen(process.env.PORT || 5000, () =>
  console.log("Server running at " + (process.env.PORT || 5000))
);
