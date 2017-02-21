const express     = require('express'),
  app         = express(),
  port        = 3000,
  path        = require('path'),
  serveStatic = require('serve-static');

console.log(path.resolve(__dirname, '../dist'));

app.use(serveStatic(path.resolve(__dirname, '../dist')));

app.use(function(req, res) {
  var err = new Error('Not Found');
  err.status = 404;
  err.url = req.url;
  console.error(err);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`Server is listening on ${port}`);
});
