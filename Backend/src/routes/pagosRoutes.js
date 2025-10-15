const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/pagosController");

router.get("/", ctrl.obtenerPagos);
router.post("/", ctrl.crearPago);
router.get("/:id", ctrl.obtenerPagoPorId);
router.put("/:id", ctrl.actualizarPago);
router.delete("/:id", ctrl.eliminarPago);

module.exports = router;
