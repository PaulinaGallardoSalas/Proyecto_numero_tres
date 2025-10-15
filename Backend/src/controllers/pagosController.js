const db = require("../config/firebase");
const collection = db.collection("pagos");

exports.obtenerPagos = async (req, res) => {
  try {
    const snapshot = await collection.get();
    const pagos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearPago = async (req, res) => {
  try {
    const nuevo = await collection.add(req.body);
    res.status(201).json({ id: nuevo.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPagoPorId = async (req, res) => {
  try {
    const doc = await collection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Pago no encontrado" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarPago = async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarPago = async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ mensaje: "Pago eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
