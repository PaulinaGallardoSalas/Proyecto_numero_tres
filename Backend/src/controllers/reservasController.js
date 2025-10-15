const db = require("../config/firebase");
const collection = db.collection("reservas");

exports.obtenerReservas = async (req, res) => {
  try {
    const snapshot = await collection.get();
    const reservas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearReserva = async (req, res) => {
  try {
    const nueva = await collection.add(req.body);
    res.status(201).json({ id: nueva.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerReservaPorId = async (req, res) => {
  try {
    const doc = await collection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarReserva = async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarReserva = async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ mensaje: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Requisito extra: listar reservas activas por miembro
exports.obtenerReservasActivasPorMiembro = async (req, res) => {
  try {
    const { id } = req.params;
    const hoy = new Date().toISOString().split("T")[0];
    const snapshot = await collection
      .where("miembro_id", "==", id)
      .where("fecha", ">=", hoy)
      .get();
    const activas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(activas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
