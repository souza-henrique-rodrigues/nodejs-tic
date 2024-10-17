import { DOUBLE, Sequelize, where } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./loja.db",
});

sequelize.authenticate();

export const Produto = sequelize.define("produto", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  preco: {
    type: DOUBLE,
    allowNull: false,
  },
});

export const criarProduto = async (produto) => {
  try {
    const produto = await Produto.create(produto);
    return produto;
  } catch (erro) {
    throw erro;
  }
};

export const visualizarProdutos = async () => {
  try {
    const produtos = await Produto.findAll();
    return produtos;
  } catch (erro) {
    throw erro;
  }
};

export const visualzarProdutoId = async (id) => {
  try {
    const produto = await Produto.findByPk(id);
    return produto;
  } catch (erro) {
    throw erro;
  }
};

export const atualizarProdutoId = async (id, dados) => {
  try {
    const produto = await Produto.update(id, dados, { where: { id: id } });
    return produto;
  } catch (erro) {
    throw erro;
  }
};

export const deletaProdutoId = async (id) => {
  try {
    const produto = await Produto.destroy({ where: { id: id } });
    return;
  } catch (erro) {
    throw erro;
  }
};
