const { Op } = require("sequelize");  // <-- Add this at the top if not already
const validate = require('../middleware/joiValidator');
const { patientSchema ,searchSchema} = require('./validation');  // <-- Adjust the path as necessary

module.exports = (app) => {
  const { Patient } = require('../models');

  // Add new patient
  app.post('/patients',validate(patientSchema), async (req, res) => {
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
  app.get('/patients/search',validate(searchSchema, 'query'), async (req, res) => {
  const { id} = req.query;

  try {
    const results = await Patient.findOne ({ where:{id} });
    const arr = [];
    if (results) arr.push(results);
    res.json(arr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
};
