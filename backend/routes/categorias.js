const express = require("express");

const {
  getAll,
  get,
  add,
  replace,
  remove,
} = require("../controller/categoria");
const { checkAuth } = require("../util/auth");
const { isValidText } = require("../util/validation");

const router = express.Router();
router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const categorias = await getAll();
    res.json({ categorias: categorias });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const categoria = await get(req.params.id);
    res.json({ categoria: categoria });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (!isValidText(data.categoria)) {
    errors.id = "categoria Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the categoria failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "categorias guardada.", categoria: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidText(data.categoria)) {
    errors.id = "categoria Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the categoria failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "categoria atualizado.", categoria: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "categoria apagado." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
