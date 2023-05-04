const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  const hashedPw = await hash(data.pass_func, 12);
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, pass_func: hashedPw, id: userId });
  await writeData(storedData);
  return { id: userId, num_func: data.num_func, pass_func: data.pass_func};
}

async function get(num_func) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = storedData.users.find((ev) => ev.num_func === num_func);
  if (!user) {
    throw new NotFoundError('Could not find user for num_func ' + num_func);
  }

  return user;
}

exports.add = add;
exports.get = get;
