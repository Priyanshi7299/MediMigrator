module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Patient', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.ENUM('Male', 'Female', 'Other'),
    contact: DataTypes.STRING
  }, {
    tableName: 'patients',
    timestamps: false
  });
};
