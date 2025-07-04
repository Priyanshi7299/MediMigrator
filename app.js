const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const path = require('path');

const app = express();
app.use(bodyParser.json());

db.sequelize.sync().then(() => console.log("DB synced"));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
require('./routes/patient.routes')(app);
require('./routes/visit.routes')(app);

app.listen(3000, () => console.log("Server running on port 3000"));
