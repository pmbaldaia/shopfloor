const express = require("express");

const { getAll, get, add, replace, remove } = require("../controller/tarefa");
const { checkAuth } = require("../util/auth");
const { isValidText } = require("../util/validation");

const router = express.Router();
router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const tarefas = await getAll();
    res.json({ tarefas: tarefas });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const tarefa = await get(req.params.id);
    res.json({ tarefa: tarefa });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (!isValidText(data.tarefa)) {
    errors.id = "tarefa Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the tarefa failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "tarefas guardada.", tarefa: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidText(data.tarefa)) {
    errors.id = "tarefa Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the tarefa failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "tarefa atualizado.", tarefa: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "tarefa apagado." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
