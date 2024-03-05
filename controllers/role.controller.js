const catchAsync = require('../utils/catchAsync');
const { Role } = require('../models');

const createRole = catchAsync(async (req, res) => {
  const { permissions } = req.user.roleId
  const all = permissions.find(i => i.module === 'all');
  if (all) {

    const { name, permissions } = req.body;
    await Role.create({ name, permissions });

    return res.status(200).send('User role created');

  } else {
    return res.status(403).send('Forbiden! You are not allowed to create a role');
  }
});

const getRoles = catchAsync(async (req, res) => {
  
});

const getRole = catchAsync(async (req, res) => {
 
});

const updateRole = catchAsync(async (req, res) => {
  
});

const deleteRole = catchAsync(async (req, res) => {

});

module.exports = {
  createRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};
