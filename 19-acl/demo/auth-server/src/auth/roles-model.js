'use strict';

const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
  role: { type:String, required:true },
  capabilities: { type: [String], required:true },
});

module.exports = mongoose.model('roles', rolesSchema);