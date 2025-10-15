const db = require("../config/firebase");
const collection = db.collection("clases");

exports.obtenerClases = async (req, res) => {
  try {
    const snapshot = await collection.get();
    const clases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearClase = async (req, res) => {
  try {
    const nueva = await collection.add(req.body);
    res.status(201).json({ id: nueva.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerClasePorId = async (req, res) => {
  try {
    const doc = await collection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Clase no encontrada" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarClase = async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarClase = async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ mensaje: "Clase eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
