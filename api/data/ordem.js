const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.ordens) {
    throw new NotFoundError("Não foi encontrada nenhuma ordem.");
  }
  return storedData.ordens;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.ordens || storedData.ordens.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma ordem.");
  }

  const ordem = storedData.ordens.find((ev) => ev.id === id);
  if (!ordem) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma ordem com esse id " + id
    );
  }

  return ordem;
}

async function add(data) {
  const storedData = await readData();
  storedData.ordens.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.ordens || storedData.ordens.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma ordem.");
  }

  const index = storedData.ordens.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma ordem com esse id " + id
    );
  }

  storedData.ordens[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.ordens.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, ordens: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
