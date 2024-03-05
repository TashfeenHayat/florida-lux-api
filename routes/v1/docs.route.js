const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Define options for swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Your API', // Specify the title of your API
      version: '1.0.0', // Specify the version of your API
      description: 'API documentation generated with Swagger',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT',
        },
      },
      security: [ { bearerAuth: [] } ],
    
    },
    security: [ { bearerAuth: [] } ],
  },
  apis: ['./docs/*.doc.js'], // Specify the path to your API routes
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger documentation using swagger-ui-express
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;