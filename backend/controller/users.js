const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.users) {
    throw new NotFoundError("Não foi encontrado nenhum user.");
  }
  return storedData.users;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Não foi encontrado nenhum user.");
  }

  const user = storedData.users.find((ev) => ev.id === id);
  if (!user) {
    throw new NotFoundError("Não foi encontrado nenhum user com esse id " + id);
  }

  return user;
}

async function add(data) {
  const storedData = await readData();
  storedData.users.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Não foi encontrado nenhum user.");
  }

  const index = storedData.users.findIndex((ev) => ev.id == id);
  if (index < 0) {
    throw new NotFoundError("Não foi encontrado nenhum user com esse id " + id);
  }

  storedData.users[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.users.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, users: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
