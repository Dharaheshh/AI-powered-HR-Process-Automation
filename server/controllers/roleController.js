const Role = require('../models/Role');

// @desc    Get all predefined roles
// @route   GET /api/roles
// @access  Public
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().sort({ department: 1, name: 1 });
    res.status(200).json({ success: true, count: roles.length, roles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single role by ID
// @route   GET /api/roles/:id
// @access  Public
const getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found' });
    }
    res.status(200).json({ success: true, role });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getRoles, getRole };
