module.exports = (app) => {
  const { Visit, Patient } = require('../models');

  // Record visit
  app.post('/visits', async (req, res) => {
    try {
      const visit = await Visit.create(req.body);
      res.json(visit);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // View visit history of patient
  app.get('/patients/:id/visits', async (req, res) => {
    const visits = await Visit.findAll({
      where: { patient_id: req.params.id },
      include: [{ model: Patient }]
    });
    res.json(visits);
  });
};
