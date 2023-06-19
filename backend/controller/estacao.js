const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.estacoes) {
    throw new NotFoundError("Não foi encontrada nenhuma estacao.");
  }
  return storedData.estacoes;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.estacoes || storedData.estacoes.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma estacao.");
  }

  const estacao = storedData.estacoes.find((ev) => ev.id === id);
  if (!estacao) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma estacao com esse id " + id
    );
  }

  return estacao;
}

async function add(data) {
  const storedData = await readData();
  storedData.estacoes.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.estacoes || storedData.estacoes.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma estacao.");
  }

  const index = storedData.estacoes.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma estacao com esse id " + id
    );
  }

  storedData.estacoes[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.estacoes.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, estacoes: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
