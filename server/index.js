const express     = require('express'),
  app         = express(),
  port        = 3000,
  path        = require('path'),
  favicon     = require('serve-favicon'),
  serveStatic = require('serve-static');

app.use(favicon(path.resolve(__dirname, 'favicon.ico')));
app.use(serveStatic(path.resolve(__dirname, '../dist')));

app.use('/', function(req, res) {
  res.render('index.html');
});

app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  err.url = req.url;
  // eslint-disable-next-line no-console
  console.error(err);
  res.json({error: 'Not available'});
});

app.listen(port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.log('something bad happened', err);
  }
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port}`);
});
