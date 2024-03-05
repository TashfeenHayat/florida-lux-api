const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Role Schema
const roleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['user', 'admin'],
  },
  permissions: [{
    module: {
      type: String,
    },
    accessLevel: [{
      type: [String],
      enum: ['read', 'write', 'delete', 'all'],
    }]
  }]
});

// Create Role model
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;