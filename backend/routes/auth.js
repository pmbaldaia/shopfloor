/* const express = require("express");
const { add, get } = require("../controller/user");
const { createJSONToken } = require("../util/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const num_func = req.body.num_func;
  const pass_func = req.body.pass_func;

  let user;
  let password;
  try {
    user = await get(num_func);
    password = await get(pass_func);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const token = createJSONToken(user);
  res.json({ token });
});

module.exports = router;
 */ const express = require("express");
const { get } = require("../controller/user");
const { createJSONToken } = require("../util/auth");

const router = express.Router();

router.post("/login", async (req, res) => {
  const num_func = req.body.num_func;
  const pass_func = req.body.pass_func;

  try {
    const user = await get(num_func);

    if (!user) {
      throw new Error("Authentication failed: User not found.");
    }

    if (user.user_tipo === "gestor" && user.pass_func !== pass_func) {
      throw new Error("Authentication failed: Incorrect password.");
    }

    const token = createJSONToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Authentication failed." });
  }
});

module.exports = router;
