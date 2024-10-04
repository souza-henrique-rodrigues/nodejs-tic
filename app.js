const http = require("http");
const fs = require("fs");
const util = require("util");

const writeFileaSync = util.promisify(fs.writeFileSync);
const readFileaSync = util.promisify(fs.readFileSync);

const writtingFile = async () => {
  const dataToWritte = "Mensagem via fs module";
  const path = "./mensagem2";

  try {
    await writeFileaSync(path, dataToWritte);
  } catch (error) {
    console.error(error);
  }
};

const readFile = async () => {
  pathToRead = "./mensagem2";

  try {
    const mensagem = await readFileaSync(pathToRead, "utf-8");
    return mensagem;
  } catch (error) {
    console.error(error);
  }
};

async () => {
  await writtingFile();
  await readFile();
};

const server = http.createServer((req, res) => {
  try {
    res.writeHead(200, { "Content-type": "text/plain" });
    res.end("Enviando um arquivo de texto", readFile());
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
