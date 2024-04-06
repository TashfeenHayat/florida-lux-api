const mongoose = require('mongoose');

const catchAsync = require('../utils/catchAsync');
const { Agent } = require('../models');

const createAgent = catchAsync(async (req, res) => {

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {
  
    await Agent.create(req.body);
    
    return res.status(200).send('Agent created successfully');
    
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create an agent');
  }
});

const getAgent = catchAsync(async (req, res) => {
  const agent = await Agent.findById(req.params.id);
  return res.status(200).send(agent)
});

const updateAgent = catchAsync(async (req, res) => {

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {

    await Agent.findByIdAndUpdate(req.params.id, req.body);
    
    return res.status(200).send('Agent updated successfully');
    
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create an agent');
  }
});

const deleteAgent = catchAsync(async (req, res) => {

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {
  
    const agent = await Agent.deleteOne({ _id: req.params.id });
    console.log(agent)
    if (agent.deletedCount > 0) {
      return res.status(200).send('Agent deleted successfully');
    } else {
      return res.status(404).send('Agent not found');
    }
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create an agent');
  }
});

const getAllAgents = catchAsync(async (req, res) => {
    
    try {
      const { key } = req.query;
      let query = {};

    // Add search filters to the query object
    if (key) {
      // query.firstName = { $regex: key, $options: 'i' }; // Case-insensitive regex search for name
      query = { 
        $or:[
          { firstName: { $regex: key, $options: 'i'  }},
          { lastName: { $regex: key, $options: 'i'  }},
          { email: { $regex: key, $options: 'i'  }},
      ]}
      // If key is provided
      const allAgents = await Agent.find(query);
      return res.status(200).json(allAgents);
    }
      
      // If no key is provided, return all agents
      const allAgents = await Agent.find();
      return res.status(200).json(allAgents);
    } catch (error) {
      // Handle errors
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = {
    createAgent,
    getAgent,
    updateAgent,
    deleteAgent,
    getAllAgents,
};
