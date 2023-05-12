const express = require("express");
const { add, get } = require("../controller/user");
const { createJSONToken /* isValidPassword */ } = require("../util/auth");
const { isValidOrdemNum /* isValidText */ } = require("../util/validation");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidOrdemNum(data.num_func)) {
    errors.num_func = "Invalid num_func.";
  } else {
    try {
      const existingUser = await get(data.num_func);
      if (existingUser) {
        errors.num_func = "num_func exists already.";
      }
    } catch (error) {}
  }

  /*  if (!isValidText(data.password, 6)) {
    errors.password = 'Invalid password. Must be at least 6 characters long.';
  }
 */
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    const authToken = createJSONToken(createdUser.num_func);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res) => {
  const num_func = req.body.num_func;
  /* const password = req.body.password; */

  let user;
  try {
    user = await get(num_func);
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed." });
  }

  /* const pwIsValid = await isValidPassword(password, user.password);
  if (!pwIsValid) {
    return res.status(422).json({
      message: 'Invalid credentials.',
      errors: { credentials: 'Invalid num_func or password entered.' },
    });
  } */

  const token = createJSONToken(num_func);
  res.json({ token });
});

module.exports = router;
