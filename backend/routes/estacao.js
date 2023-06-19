const express = require("express");

const { getAll, get, add, replace, remove } = require("../controller/estacao");
const { checkAuth } = require("../util/auth");
const { isValidText } = require("../util/validation");

const router = express.Router();
router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const estacoes = await getAll();
    res.json({ estacoes: estacoes });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const estacao = await get(req.params.id);
    res.json({ estacao: estacao });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (!isValidText(data.estacao)) {
    errors.id = "estacao Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the estacao failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "estacoes guardada.", estacao: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidText(data.estacao)) {
    errors.id = "estacao Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the estacao failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "estacao atualizado.", estacao: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "estacao apagado." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
