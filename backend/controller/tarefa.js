const { v4: generateId } = require("uuid");

const { NotFoundError } = require("../util/errors");
const { readData, writeData } = require("./util");

async function getAll() {
  const storedData = await readData();
  if (!storedData.tarefas) {
    throw new NotFoundError("Não foi encontrada nenhuma tarefa.");
  }
  return storedData.tarefas;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.tarefas || storedData.tarefas.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma tarefa.");
  }

  const tarefa = storedData.tarefas.find((ev) => ev.id === id);
  if (!tarefa) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma tarefa com esse id " + id
    );
  }

  return tarefa;
}

async function add(data) {
  const storedData = await readData();
  storedData.tarefas.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.tarefas || storedData.tarefas.length === 0) {
    throw new NotFoundError("Não foi encontrada nenhuma tarefa.");
  }

  const index = storedData.tarefas.findIndex((ev) => ev.id === id);
  if (index < 0) {
    throw new NotFoundError(
      "Não foi encontrada nenhuma tarefa com esse id " + id
    );
  }

  storedData.tarefas[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.tarefas.filter((ev) => ev.id !== id);
  await writeData({ ...storedData, tarefas: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.add = add;
exports.replace = replace;
exports.remove = remove;
