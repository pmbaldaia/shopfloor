require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const ordemRoutes = require("./routes/ordens.js");
const tarefaRoutes = require("./routes/tarefas.js");
const maquinaRoutes = require("./routes/maquinas.js");
const materialRoutes = require("./routes/materiais.js");
const categoriaRoutes = require("./routes/categorias.js");
const tipoRoutes = require("./routes/tipos.js");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRoutes);

app.use("/ordens", ordemRoutes);
app.use("/tarefas", tarefaRoutes);
app.use("/maquinas", maquinaRoutes);
app.use("/materiais", materialRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/tipos", tipoRoutes);
app.use("/users", userRoutes);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

app.listen(8080);
