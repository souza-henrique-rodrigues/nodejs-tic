const http = require("http");
const fs = require("fs");

const message = "Escrevendo arquivo vid FS module";

fs.writeFileSync("./mensagem.txt", message, "utf-8", (error) => {
  if (error) {
    console.log("error");
  }
  console.log("Fille writen sucessfully");
});

const server = http.createServer((req, res) => {
  try {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("text");
  } catch (error) {
    res.writeHead(500);
    res.end("Erro interno servidor");
  }
});

host = "localhost";
port = 3000;

server.listen(port, host, () => {
  console.log(`App rodando na porta ${port}:${host}`);
});
