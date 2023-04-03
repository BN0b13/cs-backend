import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes/index.js';

const app = express();
const port = process.env.PORT;

// app.use(cookieParser());
// mongoose.connect(process.env.CONNECTIONSTRING, { 
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   }).then(() => {
//     console.log('DB Connected');
//   }).catch(err=>{
//     return console.log(err);
// });
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
// }));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
//Local
// app.use(cors());

// Prod
// app.use(cors({
//   origin: 'https://cosmicstrains.com'
// }));

// app.disable('x-powered-by');

app.use('/', routes);

app.listen(port, () => console.log(`Cosmic Strains Backend listening on port ${port}.`));