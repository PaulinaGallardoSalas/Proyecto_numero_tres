const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/clasesController");

router.get("/", ctrl.obtenerClases);
router.post("/", ctrl.crearClase);
router.get("/:id", ctrl.obtenerClasePorId);
router.put("/:id", ctrl.actualizarClase);
router.delete("/:id", ctrl.eliminarClase);

module.exports = router;
