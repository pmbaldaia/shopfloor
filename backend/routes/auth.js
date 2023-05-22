const express = require("express");
const { add, get } = require("../controller/user");
const { createJSONToken } = require("../util/auth");
/* const { isValidOrdemNum /* isValidText } = require("../util/validation"); */

const router = express.Router();

router.post("/login", async (req, res) => {
  const num_func = req.body.num_func;

  let user;
  try {
    user = await get(num_func);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  const token = createJSONToken(user);
  res.json({ token });
});

module.exports = router;
