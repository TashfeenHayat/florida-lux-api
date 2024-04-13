const catchAsync = require('../utils/catchAsync');
const { Agent, Filter, Property } = require('../models');

const createProperty = catchAsync(async (req, res) => {

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {

    const agent = await Agent.findById(req.body.agentId);

    if (agent) {

      const filters = await Filter.find({ '_id': { $in: req.body.filters } });

      if (filters.length > 0) {
        await Property.create(req.body);
        return res.status(200).send('Property created successfully');
      } else {
        return res.status(404).send('Filters not found');
      }
    } else {
      return res.status(404).send('Agent not found');
    }
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create a property');
  }
});

const getProperty = catchAsync(async (req, res) => {
  const property = await Property.findById(req.params.id)
  .populate({
    path: 'agentId',
  }).populate({
    path: 'filters'
  }).exec();
  return res.status(200).send(property);
});

const updateProperty = catchAsync(async (req, res) => {

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {
    
    if (req.body.agentId) {
      const agent = await Agent.findById(req.body.agentId);
      if (!agent) {
        return res.status(404).send('Agent not found');
      }
    }

    if (req.body.filters && req.body.filters.length > 0) {
      const filters = await Filter.find({ '_id': { $in: req.body.filters } });
      if (filters.length === 0) {
        return res.status(404).send('Filters not found');
      }
    }

    await Property.findByIdAndUpdate(req.params.id, req.body);
    
    return res.status(200).send('Property updated successfully');
    
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create a property');
  }
});

const getProperties = catchAsync(async (req, res) => {
  
  try {
    const { key, agentId, filterId } = req.query;
    const query = {};
  
    // Add search filters to the query object
    if (key) {
      query.$or = [
        { name: { $regex: key, $options: 'i' } },
      ];
    }
  
    if (agentId) {
      query.agentId = agentId;
    }
  
    if (filterId) {
      query.filters = { $in: [filterId] };
    }
  
    // If key or other query parameters are provided
    const allproperties = await Property.find(query).exec();
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
