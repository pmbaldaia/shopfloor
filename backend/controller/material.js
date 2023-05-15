const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.materiais) {
    throw new NotFoundError("Não foi encontrada nenhuma material.");
  }
  return storedData.materiais;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.materiais || storedData.materiais.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma material.");
  }

  const material = storedData.materiais.find((ev) => ev.id === id);
  if (!material) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma material com esse id " + id
    );
  }

  return material;
}

async function add(data) {
  const storedData = await readData();
  storedData.materiais.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.materiais || storedData.materiais.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma material.");
  }

  const index = storedData.materiais.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma material com esse id " + id
    );
  }

  storedData.materiais[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.materiais.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, materiais: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
