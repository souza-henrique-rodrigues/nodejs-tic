import http from "http";
import fs from "fs";
import rota from "./routes.js";
import sqlite from "sqlite3";
import { sequelize } from "./models.js";

const db = new sqlite.Database("./loja.db", (erro) => {
  if (erro) {
    console.log("Erro ao conectar ao bando de dados");
    return;
  }
  console.log("Sucesso ao inicializar conexão");
});

fs.writeFile(
  "mensagem.txt",
  "documento criado a partir do FS",
  "utf-8",
  (error) => {
    if (error) {
      console.log("Erro durante escrita");
      return;
    }
    console.log("Sucesso durante escrita");
  }
);

fs.readFile("mensagem.txt", "utf-8", (erro, conteudo) => {
  if (erro) {
    console.log("ERRO");
    return;
  }
  console.log("sucesso durante leitura");
  startServer(conteudo);
});

const startServer = async (conteudo) => {
  await sequelize.sync();
  const server = http.createServer((req, res) => {
    rota(req, res, { conteudo });
  });

  const hostname = "localhost";
  const PORT = 3000;

  server.listen(PORT, hostname, (error) => {
    if (error) {
      console.log("erro no servidor", error);
    }
    console.log(`App running on port ${PORT}:${hostname}`);
  });
};
