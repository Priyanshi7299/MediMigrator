const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const sequelize = db.sequelize; 
const path = require('path');

const app = express();
app.use(bodyParser.json());

db.sequelize.sync().then(() => console.log("DB synced"));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/patient.routes')(app);
require('./routes/visit.routes')(app);

app.get('/check-db', async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query("SELECT * FROM patients LIMIT 5");
    res.json({
      from: "AWS RDS",
      patients: results
    });
  } catch (err) {
    res.status(500).json({ error: "Database not connected properly", details: err });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
