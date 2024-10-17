import fs from "fs";
import { atualizarProdutoId, criarProduto, sequelize } from "./models.js";

export default function rota(req, res, dado) {
  res.setHeader("Content-Type", "application/json", "utf-8");

  if (req.method === "GET" && req.url === "/") {
    const { conteudo } = dado;
    res.statusCode = 200;
    const resposta = {
      mensagem: conteudo,
    };
    res.end(JSON.stringify(resposta));
    return;
  } //escopo if termina aqui

  //codigo para criar txt
  if (req.method === "POST" && req.url === "/produtos") {
    const corpo = [];

    req.on("data", (parte) => {
      corpo.push(parte);
    });

    req.on("end", async () => {
      const arquivo = JSON.parse(corpo);
      res.statusCode = 400;

      if (!produto?.nome) {
        const resposta = {
          erro: {
            mensagem: "Nome é obrigatorio para criação do produto",
          },
        };
        res.end(JSON.stringify(resposta));
        return;
      }

      if (!produto?.preco) {
        const resposta = {
          erro: {
            mensagem: "Preço é obrigatorio para criação do produto",
          },
        };
        res.end(JSON.stringify(resposta));
        return;
      }

      try {
        const produto = await criarProduto(produto);
        res.statusCode = 201;

        const resposta = {
          mensagem: `arquivo criado ${produto.nome}`,
        };

        res.end(JSON.stringify(resposta));
        return;
      } catch (erro) {
        (erro) => {
          if (erro) {
            res.statusCode = 500;
            const resposta = {
              erro: {
                mensagem: "Erro ao criar arquivo",
              },
            };
            res.end(JSON.stringify(resposta));
            return;
          }
        };
      }
    });
    req.on("error", (error) => {
      console.log(`Falha ao processar a requisição, erro ${error}`);

      res.statusCode = 400;

      const resposta = {
        erro: {
          mensagem: "Erro ao processar",
        },
      };
      res.end(JSON.stringify(resposta));
      return;
    });
    return;
  }

  //codigo para alterar txt
  if (
    req.method === "PATCH" &&
    req.url.split("/")[1] === "arquivos" &&
    !isNaN(req.url.split("/")[2])
  ) {
    const corpo = [];

    req.on("data", (parte) => {
      corpo.push(parte);
    });

    req.on("end", async () => {
      const arquivo = JSON.parse(corpo);
      res.statusCode = 400;

      if (!produto?.nome && !produto.preco) {
        const resposta = {
          erro: {
            mensagem:
              "Ao menos um dos valores é necessário para atualizar produto : Nome ou preço",
          },
        };
        res.end(JSON.stringify(resposta));
        return;
      }

      try {
        const produtoAtualizado = await atualizarProdutoId();
        res.statusCode = 201;

        const resposta = {
          mensagem: `arquivo ${arquivo.nome} atualizado com sucesso`,
        };

        res.end(JSON.stringify(resposta));
        return;
      } catch {
        if (erro) {
          req.statusCode = erro.code === "ENOENT" ? 404 : 403;

          const resposta = {
            erro: {
              mensagem: "Error ao tentar atualizar produto",
            },
          };

          res.end(JSON.stringify(resposta));
          return;
        }
      }
    });
    req.on("error", (error) => {
      console.log(`Falha ao processar a requisição, erro ${error}`);

      res.statusCode = 400;

      const resposta = {
        erro: {
          mensagem: "Erro ao processar",
        },
      };
      res.end(JSON.stringify(resposta));
      return;
    });
    return;
  }

  //codigo para excluir txt

  if (req.method === "DELETE" && req.url === "/arquivos") {
    const corpo = [];
    req.on("data", (parte) => {
      corpo.push(parte);
    });

    req.on("end", () => {
      const arquivo = JSON.parse(corpo);

      fs.rm(`${arquivo.nome}.txt`, (erro) => {
        if (erro) {
          req.statusCode = erro.code === "ENOENT" ? 404 : 403;

          const resposta = {
            error: {
              mensagemErro: "Erro ao tentar excluir arquivo",
            },
          };
          res.end(JSON.stringify(resposta));
          return;
        }

        req.statusCode = 200;
        const resposta = {
          sucessos: {
            mensagem: `O arquivo '${arquivo.nome}' foi excluido com sucesso`,
          },
        };
        res.end(JSON.stringify(resposta));
        return;
      });
    });
    return;
  }

  res.statusCode = 404;

  const resposta = {
    erro: {
      mensagem: "Rota não encontrada",
      url: req.url,
    },
  };

  res.end(JSON.stringify(resposta));
  //se a rota/metodo informado não forem correto, roda esse codigo acima
}
