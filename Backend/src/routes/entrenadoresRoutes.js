const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/entrenadoresController");

router.get("/", ctrl.obtenerEntrenadores);
router.post("/", ctrl.crearEntrenador);
router.get("/:id", ctrl.obtenerEntrenadorPorId);
router.put("/:id", ctrl.actualizarEntrenador);
router.delete("/:id", ctrl.eliminarEntrenador);

module.exports = router;
