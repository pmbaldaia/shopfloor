const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.maquinas) {
    throw new NotFoundError("Não foi encontrada nenhuma maquina.");
  }
  return storedData.maquinas;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.maquinas || storedData.maquinas.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma maquina.");
  }

  const maquina = storedData.maquinas.find((ev) => ev.id === id);
  if (!maquina) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma maquina com esse id " + id
    );
  }

  return maquina;
}

async function add(data) {
  const storedData = await readData();
  storedData.maquinas.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.maquinas || storedData.maquinas.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma maquina.");
  }

  const index = storedData.maquinas.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma maquina com esse id " + id
    );
  }

  storedData.maquinas[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.maquinas.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, maquinas: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
