exports.options = {
    routePrefix: '/swagger',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'The Unbanked API',
        description: 'The API Endpoint for the unbanked Hackerthon',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost:4040',
      schemes: ['http','https'],
      consumes: ['application/json'],
      produces: ['application/json']
    }
  }