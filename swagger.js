const swaggerAutogen = require('swagger-autogen')()


const doc = {
  info: {
    version: '1.0.0',
    title: 'Film API',
    description: 'Films Api Endpoint'
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      'name': 'Film',
      'description': 'Endpoints'
    }
  ],
  securityDefinitions: {
    apiKeyAuth:{
      type: 'apiKey',
      in: 'header',       // can be "header", "query" or "cookie"
      name: 'x-access-token',  // name of the header, query parameter or cookie
      description: 'any description...'
    }
  },
}

const outputFile = '../swagger-output.json'
const endpointsFiles = ['./server.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js')           // Your project's root file
})
