const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.categorias) {
    throw new NotFoundError("Não foi encontrada nenhuma categoria.");
  }
  return storedData.categorias;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.categorias || storedData.categorias.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma categoria.");
  }

  const categoria = storedData.categorias.find((ev) => ev.id === id);
  if (!categoria) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma categoria com esse id " + id
    );
  }

  return categoria;
}

async function add(data) {
  const storedData = await readData();
  storedData.categorias.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.categorias || storedData.categorias.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma categoria.");
  }

  const index = storedData.categorias.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma categoria com esse id " + id
    );
  }

  storedData.categorias[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.categorias.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, categorias: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
