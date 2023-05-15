const express = require("express");

const { getAll, get, add, replace, remove } = require("../controller/material");
const { checkAuth } = require("../util/auth");
const { isValidText } = require("../util/validation");

const router = express.Router();
router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const materiais = await getAll();
    res.json({ materiais: materiais });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const material = await get(req.params.id);
    res.json({ material: material });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (!isValidText(data.material)) {
    errors.id = "Material Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the material failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "materiais guardada.", material: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (!isValidText(data.material)) {
    errors.id = "Material Inválido.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the material failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "material atualizado.", material: data });
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
