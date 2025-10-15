const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reservasController");

router.get("/", ctrl.obtenerReservas);
router.post("/", ctrl.crearReserva);
router.get("/:id", ctrl.obtenerReservaPorId);
router.put("/:id", ctrl.actualizarReserva);
router.delete("/:id", ctrl.eliminarReserva);

// Requisito extra
router.get("/miembro/:id/activas", ctrl.obtenerReservasActivasPorMiembro);

module.exports = router;
