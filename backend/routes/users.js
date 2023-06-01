const express = require("express");
const {
  getAll,
  get,
  add,
  replace,
  remove,
  getUserById,
  updateUser,
} = require("../controller/users");
const { checkAuth } = require("../util/auth");

const router = express.Router();
router.use(checkAuth);

router.get("/", async (req, res, next) => {
  console.log(req.token);
  try {
    const users = await getAll();
    res.json({ users: users });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await get(req.params.id);
    res.json({ user: user });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;
  let errors = {};

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the user failed due to validation errors.",
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: "Utilizador guardado.", user: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the user failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "User atualizada.", users: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "User apagada." });
  } catch (error) {
    next(error);
  }
});

// Update user's type
router.put("/:id", async (req, res, next) => {
  const userId = req.params.id;
  const novoTipo = req.body.tipo;

  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("Operário não encontrado.");
    }

    user.tipo = novoTipo;

    await updateUser(userId, user);
    res.json({ message: "Tipo de operário atualizado." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
