import express from "express";
import dotenv from "dotenv";
import dbConnection from "./config/dbConfig";
import router from "./routers";

dotenv.config();

const server = express();
router(server);

dbConnection.on("error", console.log.bind("Error ao conectar com o banco"));
dbConnection.once("open", () =>
  console.log("A conexão com o banco foi realizada com sucesso")
);

server.listen(process.env.PORT || 5000, () =>
  console.log("Server running at " + process.env.PORT || 5000)
);
