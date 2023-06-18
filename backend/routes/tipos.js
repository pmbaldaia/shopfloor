const express = require("express");

const { getAll, get, add, replace, remove } = require("../controller/tipo");
const { checkAuth } = require("../util/auth");
const { isValidText } = require("../util/validation");

const router = express.Router();
router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const tipos = await getAll();
    res.json({ tipos: tipos });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const tipo = await get(req.params.id);
    res.json({ tipo: tipo });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (!isValidText(data.tipo)) {
    errors.id = "tipo Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the tipo failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "tipos guardada.", tipo: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidText(data.tipo)) {
    errors.id = "tipo Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the tipo failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "tipo atualizado.", tipo: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "tipo apagado." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
