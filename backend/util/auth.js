const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const { NotAuthError } = require("./errors");
const KEY = "process.env.JWT_SECRET";

function createJSONToken(num_func) {
  return sign({ num_func }, KEY, { expiresIn: "1h" });
}

function validateJSONToken(token) {
  return verify(token, KEY);
}

function isValidPassword(pass_func, storedPassword) {
  return compare(pass_func, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return res.status(401).json({ error: "Not authenticated." });
  }
  // ...
  try {
    let token = req.headers.authorization.split(" ")[1];
    const validatedToken = validateJSONToken(token);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return res.status(401).json({ error: "Not authenticated." });
  }
  next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;
