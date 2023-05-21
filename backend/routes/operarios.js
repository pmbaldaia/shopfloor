const express = require("express");

const { getAll, get, add, replace, remove } = require("../controller/operario");
const { checkAuth } = require("../util/auth");
const {
  isValidOperarioNum,
  isValidNome,
  isValidTarefa,
} = require("../util/validation");

const router = express.Router();
router.use(checkAuth);
router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const operarios = await getAll();
    res.json({ operarios: operarios });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const operario = await get(req.params.id);
    res.json({ operario: operario });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (!isValidOperarioNum(data.id)) {
    errors.id = "ID Inválido.";
  }

  if (!isValidNome(data.nome_func)) {
    errors.nome = "nome_func inválida.";
  }

  if (!isValidTarefa(data.tarefas)) {
    errors.tarefa = "Tarefa inválida.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the operario failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "operarios guardada.", operario: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidOperarioNum(data.id)) {
    errors.id = "ID Inválido.";
  }

  if (!isValidNome(data.nome_func)) {
    errors.nome = "nome_func inválida.";
  }

  if (!isValidTarefa(data.tarefas)) {
    errors.tarefa = "Tarefa inválida.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the operario failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "operario atualizado.", operario: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Operario apagado." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
