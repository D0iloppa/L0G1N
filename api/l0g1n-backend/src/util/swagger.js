// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'l0g1n API',
      version: '1.0.0',
      description: '인증 시스템 API 문서',
    },
  },
  apis: ['./routes/*.js'], // 주석 기반 문서 위치
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
