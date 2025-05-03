const models = require("../database/models");

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const user = await models.User.create(req.body);
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  console.log('getting users');
  try {
    const users = await models.User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario existente
// Actualizar un usuario existente (versión corregida)
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    // Opción 1: La solución más simple (recomendada)
    const [updatedCount] = await models.User.update(req.body, {
      where: { id }
    });

    if (updatedCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedUser = await models.User.findByPk(id);
    return res.status(200).json({ user: updatedUser });

    // Opción 2: Si realmente necesitas los hooks
    /* 
    const user = await models.User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const updatedUser = await user.update(req.body);
    return res.status(200).json({ user: updatedUser });
    */
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await models.User.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
};
