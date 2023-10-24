import Logger from './infrastructure/core/Logger';
import { port, environment } from './config';
import app from './app';
// import './infrastructure/database/dbEngines/mongodb/connection';

app
  .listen(8080, (err, address) => {
    if (err) {
      Logger.error(err)
    }
    Logger.info(`
    Alfa is running at ${address}:${port}
    Environment: ${environment}
  `);
  });
