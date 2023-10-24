
import Logger from './infrastructure/core/Logger';
import routes from './presentation/routes';
import Fastify from 'fastify';
// import swagger from './swagger';
import cors from '@fastify/cors'
import { corsUrl } from './config';

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = Fastify({
  logger: true,
});

app.register(cors, {
  credentials: true,
  origin: corsUrl,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
})
// app.register(require("@fastify-swagger"), swagger);

// Routes
routes.forEach((route) => {
  app.route(route);
});

app.get('/healthcheck', (req, res) => {
  res.send({ status: "THIS WORKS" });
});


export default app;
