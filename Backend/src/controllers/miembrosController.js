const db = require("../config/firebase");
const collection = db.collection("miembros");

// Obtener todos los miembros
exports.obtenerMiembros = async (req, res) => {
  try {
    const snapshot = await collection.get();
    const miembros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(miembros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear miembro
exports.crearMiembro = async (req, res) => {
  try {
    const nuevo = await collection.add(req.body);
    res.status(201).json({ id: nuevo.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener miembro por ID
exports.obtenerMiembroPorId = async (req, res) => {
  try {
    const doc = await collection.doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: "Miembro no encontrado" });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar miembro
exports.actualizarMiembro = async (req, res) => {
  try {
    await collection.doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar miembro
exports.eliminarMiembro = async (req, res) => {
  try {
    await collection.doc(req.params.id).delete();
    res.json({ mensaje: "Miembro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
