import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import serveStatic from 'serve-static';
import utils from './utils';

utils.setEnvVars();

const app = express();
const port = 3000;

app.use(favicon(path.resolve(__dirname, 'favicon.ico')));
app.use(serveStatic(path.resolve(__dirname, '../dist')));

const index = require('./routes/index');
const blog = require('./routes/blog');

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
