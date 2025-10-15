const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const routes = require("./routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas principales
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ ok: true, msg: "API de Gestión de Gimnasio operativa 🏋️‍♂️" });
});

module.exports = app;
