import express = require('express');
import cors = require('cors');
import mongodb from './db/mongodb';
import routes from './controllers';

class App {
  public express;

  constructor() {
    mongodb.connect();
    this.express = express();
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use('/', routes);
  }
}

export default new App().express;
