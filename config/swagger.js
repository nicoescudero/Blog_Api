exports.configSwagger = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Blog API-REST',
      version: '1.0.0',
      description: 'An api for my personal blog',
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'My API Documentation',
      },
    ],
  },
  apis: ['./routes/*.js'],
};
