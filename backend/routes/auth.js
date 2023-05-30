const express = require("express");
const { add, get } = require("../controller/user");
const { createJSONToken } = require("../util/auth");
/* const { isValidOrdemNum /* isValidText } = require("../util/validation"); */

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
