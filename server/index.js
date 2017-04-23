import express from 'express';
import session from 'express-session';
import MongoDBSession from 'connect-mongodb-session';
import path from 'path';
import favicon from 'serve-favicon';
import serveStatic from 'serve-static';
import utils from './utils';
import eHandlers from './utils/error';

const MongoDBStore = MongoDBSession(express);

utils.setEnvVars();

const port = 3000;
const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGO_DB_URI
});

store.on('error', eHandlers.serverLog);

var sess = {
  secret: 'PortfolioUnoSecret',
  store,
  resave: false,
  saveUninitialized: false
};

if (process.env.IS_PRODUCTION) {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));

app.use(favicon(path.resolve(__dirname, 'favicon.ico')));
app.use(serveStatic(path.resolve(__dirname, '../dist')));

const index = require('./routes/index');
const blog = require('./routes/blog');
const auth = require('./routes/auth');

app.use('/auth', auth);
app.use('/blog', blog);
app.use('/', index);

app.use((req, res) => {
  var err = new Error('Not Found');
  err.status = 404;
  err.url = req.url;
  // eslint-disable-next-line no-console
  console.error('url', err.url);
  console.error(err);
  res.json({ error: 'Not available' });
});

app.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.log('something bad happened', err);
  }
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port}`);
});
