import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Deathbets API',
      version: '1.0.0',
      description: 'Deathbets API',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/schemas/*.ts'],
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app: Express, port: number) {
  // swager page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs avaliable at http://localhost:${port}/docs`);
}

export default swaggerDocs;
