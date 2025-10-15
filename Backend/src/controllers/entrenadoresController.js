const db = require("../config/firebase");
const collection = db.collection("entrenadores");

exports.obtenerEntrenadores = async (req, res) => {
  try {
    const snapshot = await collection.get();
    const entrenadores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(entrenadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearEntrenador = async (req, res) => {
  try {
    const nuevo = await collection.add(req.body);
    res.status(201).json({ id: nuevo.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerEntrenadorPorId = async (req, res) => {
  try {
    const doc = await collection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Entrenador no encontrado" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarEntrenador = async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarEntrenador = async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ mensaje: "Entrenador eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
