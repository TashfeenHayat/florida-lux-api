const catchAsync = require('../utils/catchAsync');
const { User, Role, Agent } = require('../models');

const createAgent = catchAsync(async (req, res) => {
  const { name, description, phoneNumber, reference, photo, address } = req.body;

  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');

  if (all) {
  
    await Agent.create({ 
        name, description, phoneNumber, reference, photo, address
    });
    
    return res.status(200).send('Agent created successfully');
    
  } else { 
    return res.status(403).send('Forbiden! You are not allowed to create an agent');
  }
});

const getAgent = catchAsync(async (req, res) => {
  return res.status(200).send(req.user)
});

const updateAgent = catchAsync(async (req, res) => {

});

const getAllAgents = catchAsync(async (req, res) => {
    const { permissions } = req.user.roleId
    const all = permissions.find(i => i.module === 'all');
  
    if (all) {
    
      const agents = await Agent.find();
      
      return res.status(200).send(agents);
      
    } else { 
      return res.status(403).send('Forbiden! You are not allowed to see agents');
    }
});

module.exports = {
    createAgent,
    getAgent,
    updateAgent,
    getAllAgents,
};
