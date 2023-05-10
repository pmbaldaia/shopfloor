const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.operarios) {
    throw new NotFoundError("Não foi encontrada nenhuma operario.");
  }
  return storedData.operarios;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.operarios || storedData.operarios.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma operario.");
  }

  const operario = storedData.operarios.find((ev) => ev.id === id);
  if (!operario) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma operario com esse id " + id
    );
  }

  return operario;
}

async function add(data) {
  const storedData = await readData();
  storedData.operarios.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.operarios || storedData.operarios.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma operario.");
  }

  const index = storedData.operarios.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma operario com esse id " + id
    );
  }

  storedData.operarios[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.operarios.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, operarios: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
