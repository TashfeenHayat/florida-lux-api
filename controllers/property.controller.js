const mongoose = require('mongoose');

const catchAsync = require('../utils/catchAsync');
const { Agent, Property } = require('../models');

const createProperty = catchAsync(async (req, res) => {

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {
  
    await Property.create(req.body);
    
    return res.status(200).send('Property created successfully');
    
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create a property');
  }
});

const getProperty = catchAsync(async (req, res) => {
  const property = await Property.findById(req.params.id);
  return res.status(200).send(property);
});

const updateProperty = catchAsync(async (req, res) => {

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {
    // const id = mongoose.Types.ObjectId(req.body.id);
    // const isValid = mongoose.Types.ObjectId.isValid(id);

    await Property.findByIdAndUpdate(req.body.id, req.body);
    
    return res.status(200).send('Agent updated successfully');
    
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create a property');
  }
});

const getProperties = catchAsync(async (req, res) => {
    
    try {
      const { key } = req.query;
      const query = {};

    // Add search filters to the query object
    if (key) {
      query.name = { $regex: key, $options: 'i' }; // Case-insensitive regex search for name

      // If key is provided
      const allproperties = await Property.find(query);
      return res.status(200).json(allproperties);
    }
      
      // If no key is provided, return all properties
      const allproperties = await Property.find();
      return res.status(200).json(allproperties);
    } catch (error) {
      // Handle errors
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    createProperty,
    getProperty,
    updateProperty,
    getProperties,
};
