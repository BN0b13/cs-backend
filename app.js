import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes/index.js';

import Cron from './services/Cron.js';

const cron = new Cron();

cron.backup();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

//Local
app.use(cors());

// Prod
// app.use(cors({
//   origin: 'https://cosmicstrains.com'
// }));

app.disable('x-powered-by');

app.use('/', routes);

app.listen(port, () => console.log(`Cosmic Strains Backend listening on port ${port}.`));