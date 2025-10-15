const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/miembrosController");

router.get("/", ctrl.obtenerMiembros);
router.post("/", ctrl.crearMiembro);
router.get("/:id", ctrl.obtenerMiembroPorId);
router.put("/:id", ctrl.actualizarMiembro);
router.delete("/:id", ctrl.eliminarMiembro);

module.exports = router;
