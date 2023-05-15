function isValidOperarioNum(value) {
  return /^\d+$/.test(value);
}

function isValidAvatarUrl(value) {
  return value && value.startsWith("http");
}

function isValidOrdemNum(value) {
  return /^\d+$/.test(value);
}

function isValidImagemUrl(value) {
  return value && value.startsWith("http");
}

function isValidDataChegada(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidDataAquisicao(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidDataManutencao(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidDataPrevistaEntrega(value) {
  const date = new Date(value);
  return value && date !== "Invalid Date";
}

function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidEmail(value) {
  return value && value.includes("@");
}
function isValidNome(value) {
  return value && value.includes(" ");
}
function isValidTarefa(value) {
  return value && value.includes(" ");
}
exports.isValidOperarioNum = isValidOperarioNum;
exports.isValidTarefa = isValidTarefa;
exports.isValidNome = isValidNome;
exports.isValidAvatarUrl = isValidAvatarUrl;
exports.isValidOrdemNum = isValidOrdemNum;
exports.isValidImagemUrl = isValidImagemUrl;
exports.isValidDataChegada = isValidDataChegada;
exports.isValidDataAquisicao = isValidDataAquisicao;
exports.isValidDataManutencao = isValidDataManutencao;
exports.isValidDataPrevistaEntrega = isValidDataPrevistaEntrega;
exports.isValidText = isValidText;
exports.isValidEmail = isValidEmail;
