const express = require("express");
const router = express.Router();

router.use("/miembros", require("./miembrosRoutes"));
router.use("/entrenadores", require("./entrenadoresRoutes"));
router.use("/clases", require("./clasesRoutes"));
router.use("/reservas", require("./reservasRoutes"));
router.use("/pagos", require("./pagosRoutes"));

module.exports = router;
