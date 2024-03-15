const mongoose = require('mongoose');

const catchAsync = require('../utils/catchAsync');
const { Filter } = require('../models');

const createFilter = catchAsync(async (req, res) => {
  const { name, description, phoneNumber, reference, photo, address } = req.body;

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {
  
    await Filter.create({ 
        name, description, phoneNumber, reference, photo, address
    });
    
    return res.status(200).send('Filter created successfully');
    
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create an Filter');
  }
});

const getFilter = catchAsync(async (req, res) => {
  const filter = await Filter.findById(req.params.id);
  return res.status(200).send(filter)
});

const updateFilter = catchAsync(async (req, res) => {

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {
    // const id = mongoose.Types.ObjectId(req.body.id);
    // const isValid = mongoose.Types.ObjectId.isValid(id);

    await Filter.findByIdAndUpdate(req.body.id, req.body);
    
    return res.status(200).send('Filter updated successfully');
    
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create an Filter');
  }
});

const getAllFilters = catchAsync(async (req, res) => {
    
    try {
      const { key } = req.params;
      
      const query = {};

    // Add search filters to the query object
    if (key) {
      query.name = { $regex: key, $options: 'i' }; // Case-insensitive regex search for name

      // If key is provided
      const allFilters = await Filter.find(query);
      return res.status(200).json(allFilters);
    }
      
      // If no key is provided, return all agents
      const allFilters = await Filter.find(query);
      return res.status(200).json(allFilters);
    } catch (error) {
      // Handle errors
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    createFilter,
    getFilter,
    updateFilter,
    getAllFilters,
};
