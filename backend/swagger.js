const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contacts API'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger.json';
const routes = ['./routes/contact.js'];

swaggerAutogen(outputFile, routes, doc);