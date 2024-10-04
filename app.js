const http = require("http");
const fs = require("node:fs/promises");

const writeFile = async () => {
  try {
    const message = "Escrevend outro arquivo de forma assincrona agora";
    await fs.writeFile("./mensagem2.txt", message, "utf-8");
  } catch (error) {
    console.error(error);
  }
};

writeFile();

const server = http.createServer((req, res) => {
  try {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("texto");
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
