const express = require("express");

const { getAll, get, add, replace, remove } = require("../controller/maquina");
const { checkAuth } = require("../util/auth");
const {
  isValidDataAquisicao,
  isValidDataManutencao,
} = require("../util/validation");

const router = express.Router();
router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const maquinas = await getAll();
    res.json({ maquinas: maquinas });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const maquina = await get(req.params.id);
    res.json({ maquina: maquina });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (!isValidDataAquisicao(data.data_aquisicao)) {
    errors.id = "ID Inválido.";
  }

  if (!isValidDataManutencao(data.ultima_manutencao)) {
    errors.nome = "nome_func inválida.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the maquina failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "maquinas guardada.", maquina: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidDataAquisicao(data.data_aquisicao)) {
    errors.id = "ID Inválido.";
  }

  if (!isValidDataManutencao(data.ultima_manutencao)) {
    errors.nome = "nome_func inválida.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the maquina failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "maquina atualizado.", maquina: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Máquina apagado." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
