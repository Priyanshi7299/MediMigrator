const { Op } = require("sequelize");  // <-- Add this at the top if not already


module.exports = (app) => {
  const { Patient } = require('../models');

  // Add new patient
  app.post('/patients', async (req, res) => {
    try {
      const patient = await Patient.create(req.body);
      res.json(patient);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // View all patients
  app.get('/patients', async (req, res) => {
    const patients = await Patient.findAll();
    res.json(patients);
  });

  // Search patients by ID or name
  app.get('/patients/search', async (req, res) => {
  const { id, name } = req.query;
  const where = {};

  if (id) where.id = id;
  if (name) where.name = { [Op.like]: `%${name}%` };  // 🔍 Partial match

  try {
    const results = await Patient.findAll({ where });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
};
