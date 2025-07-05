  const Joi = require('joi');
  
  const patientSchema = Joi.object({
    name: Joi.string().max(255).required(),
    age: Joi.number().integer().min(0).max(120).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    contact: Joi.string().max(255).required(),
  });

  const searchSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    // name: Joi.string().min(1).optional(),
  });

  const visitSchema= Joi.object({
    patient_id: Joi.number().integer().positive().required(),
    date: Joi.date().required(),
    symptoms: Joi.string().max(255).required(),
    diagnosis: Joi.string().max(500).required(),
    prescription: Joi.string().max(500).required(),
    added_by: Joi.string().max(255).required(),
  })
  module.exports = {
    patientSchema,
    searchSchema,
    visitSchema
  };