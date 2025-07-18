const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('hospitalsystem', 'root', '12345678', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

const sequelize = new Sequelize('hospitalsystem', 'admin', 'Root12345', {
  host: 'patients-db.cnogwwy6u2fa.eu-north-1.rds.amazonaws.com',
  dialect: 'mysql',
  logging: false
});

// const sequelize = new Sequelize('hospitalsystem', 'root', 'Root@12345', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Patient = require('./patient.model')(sequelize, Sequelize);
db.Visit = require('./visit.model')(sequelize, Sequelize);

// Relations
db.Patient.hasMany(db.Visit, { foreignKey: 'patient_id' });
db.Visit.belongsTo(db.Patient, { foreignKey: 'patient_id' });

module.exports = db;
