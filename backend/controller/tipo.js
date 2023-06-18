const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.tipos) {
    throw new NotFoundError("Não foi encontrada nenhuma tipo.");
  }
  return storedData.tipos;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.tipos || storedData.tipos.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma tipo.");
  }

  const tipo = storedData.tipos.find((ev) => ev.id === id);
  if (!tipo) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma tipo com esse id " + id
    );
  }

  return tipo;
}

async function add(data) {
  const storedData = await readData();
  storedData.tipos.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.tipos || storedData.tipos.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma tipo.");
  }

  const index = storedData.tipos.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma tipo com esse id " + id
    );
  }

  storedData.tipos[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.tipos.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, tipos: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
