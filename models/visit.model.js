module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Visit', {
    visit_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    patient_id: { type: DataTypes.INTEGER },
    date: DataTypes.DATEONLY,
    symptoms: DataTypes.TEXT,
    diagnosis: DataTypes.TEXT,
    prescription: DataTypes.TEXT,
    added_by: DataTypes.STRING
  }, {
    tableName: 'visits',
    timestamps: false
  });
};
