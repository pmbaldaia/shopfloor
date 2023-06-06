const { v4: generateId } = require("uuid");
const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Não foi encontrado nenhum opearario.");
  }
  return storedData.users;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Não foi encontrado nenhum opearario.");
  }

  const user = storedData.users.find((user) => user.id === id);
  if (!user) {
    throw new NotFoundError(
      "Não foi encontrado nenhum opearario com o ID: " + id
    );
  }

  return user;
}
async function add(data) {
  const storedData = await readData();
  const newUser = { ...data, id: generateId() };
  storedData.users.unshift(newUser);
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError("Não foi encontrado nenhum opearario.");
  }

  const userIndex = storedData.users.findIndex((user) => user.id === id);
  if (userIndex < 0) {
    throw new NotFoundError(
      "Não foi encontrado nenhum operario com o ID: " + id
    );
  }

  storedData.users[userIndex] = { ...data, id };
  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedUsers = storedData.users.filter((user) => user.id !== id);
  await writeData({ ...storedData, users: updatedUsers });
}

module.exports = {
  getAll,
  get,
  add,
  replace,
  remove,
};
