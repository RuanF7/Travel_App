import express from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import countryRoutes from './routes/countries';
import { errorHandler } from './utils/errorHandler';

const app = express();

app.use(express.json());
app.use(cors());

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API para gerenciar países visitados e que se deseja visitar',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api/countries', countryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});