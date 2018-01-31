const express = require('express');
const app     = express();
const fs      = require('fs');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.get('/valves', function(req, res) {
  fs.readFile(__dirname + '/content/valves/index.md', function(err, data) {
    if (err) throw err;
    res.render('template', { content: data });
  });
});

app.get('/about-page', function(req, res) {
  fs.readFile(__dirname + '/content/about-page/index.md', function(err, data) {
    if (err) throw err;
    res.render('template', { content: data });
  });
});

app.get('/jobs', function(req, res) {
  fs.readFile(__dirname + '/content/jobs/index.md', function(err, data) {
    if (err) throw err;
    res.render('template', { content: data });
  });
});

app.listen(3000, () => console.log('Express is up and running'));
