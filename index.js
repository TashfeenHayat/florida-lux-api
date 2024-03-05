const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

const { Role, User } = require('./models');


let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(async () => {

  // Check if admin role exists
  let adminRole = await Role.findOne({ name: 'admin' });
  if (!adminRole) {
    adminRole = await Role.create({
      name: 'admin',
      permissions: [{ module: 'all', accessLevel: ['all'] }]
    });
    console.log('Admin role created');
  }

  // Check if user role exists
  let userRole = await Role.findOne({ name: 'user' });
  if (!userRole) {
    userRole = await Role.create({
      name: 'user',
      permissions: [{ module: 'user', accessLevel: ['all'] }]
    });
    console.log('User role created');
  }

  global.userRole = userRole._id;
  global.adminRole = adminRole._id;

  // Check if admin user exists
  let adminUser = await User.findOne({ username: 'admin' });
  if (!adminUser) {
    adminUser = await User.create({
      firstName: 'admin',
      lastName: 'admin',
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin@123', // You should hash passwords in a real application
      roleId: adminRole._id,
      userStatus: 'active',
      phoneNumber: '+13354365763',

    });
  }

  console.log('Admin role and user created successfully.', adminUser.username);

  logger.info('Connected to MongoDB');
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
