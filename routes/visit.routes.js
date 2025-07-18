// const { valid } = require('joi');
const validate = require('../middleware/joiValidator');
const { visitSchema, searchSchema} = require('./validation');
const client = require("../redis");

module.exports = (app) => {
  const { Visit, Patient } = require('../models');

  // Record visit
  app.post('/visits',validate(visitSchema), async (req, res) => {
    try {
      const visit = await Visit.create(req.body);
      res.json(visit);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // View visit history of patient
  // app.get('/patients/:id/visits',validate(searchSchema,"params"), async (req, res) => {
  //   const visits = await Visit.findAll({
  //     where: { patient_id: req.params.id },
  //     include: [{ model: Patient }]
  //   });
  //   res.json(visits);
  // });

app.get('/patients/:id/visits', validate(searchSchema, "params"), async (req, res) => {
  const patientId = req.params.id;
  const cacheKey = `patient:${patientId}:visits`;

  try {
    // 1. Try to get data from Redis
    const cachedData = await client.get(cacheKey);

    if (cachedData) {
      console.log("⏪ Serving from Redis cache");
      return res.json(JSON.parse(cachedData));
    }

    // 2. If not in cache, query the DB
    const visits = await Visit.findAll({
      where: { patient_id: patientId },
      include: [{ model: Patient }]
    });

    // 3. Store result in Redis (with optional expiration)
    await client.set(cacheKey, JSON.stringify(visits), {
      EX: 300 // Expires in 5 minutes (optional)
    });

    console.log("✅ Fetched from DB & cached");
    res.json(visits);
  } catch (err) {
    console.error("Redis or DB Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

};
