require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const port = process.env.PORT;

app.use(cookieParser());
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
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
// app.use(cors({
//   origin: 'https://cosmicstrains.com'
// }));

app.disable('x-powered-by');

//Import Routes
const routes = require('./routes');
app.use('/', routes);

app.listen(port, () => console.log(`Cosmic Strains Backend listening on port ${port}.`));