const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/ordem");
const { checkAuth } = require("../util/auth");
const {
  isValidOrdemNum,
  isValidImagemUrl,
  isValidDataChegada,
  isValidDataPrevistaEntrega
} = require("../util/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const ordens = await getAll();
    res.json({ ordens: ordens });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const ordem = await get(req.params.id);
    res.json({ ordem: ordem });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (!isValidOrdemNum(data.ordem_num)) {
    errors.title = "Título Inválido.";
  }

  if (!isValidDescription(data.description)) {
    errors.description = "Descrição inválida.";
  }

  if (!isValidDataChegada(data.data_chegada)) {
    errors.date = "Data inválida.";
  }
  if (!isValidDataPrevistaEntrega(data.data_prevista_entrega)) {
    errors.date = "Data inválida.";
  }
  if (!isValidImagemUrl(data.imagem)) {
    errors.image = "Imagem inválida.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the ordem failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "Ordens guardada.", ordem: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidOrdemNum(data.ordem_num)) {
    errors.title = "Título Inválido.";
  }

  if (!isValidDescription(data.description)) {
    errors.description = "Descrição inválida.";
  }

  if (!isValidDataChegada(data.data_chegada)) {
    errors.date = "Data inválida.";
  }
  if (!isValidDataPrevistaEntrega(data.data_prevista_entrega)) {
    errors.date = "Data inválida.";
  }
  if (!isValidImagemUrl(data.imagem)) {
    errors.image = "Imagem inválida.";
  }


  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the ordem failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "Ordem atualizada.", ordem: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Ordem apagada." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
