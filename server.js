const express = require('express');

const app = express();

app.use(express.static('./dist/todo-list-creator'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/todo-list-creator/'}
  );
});

app.listen(process.env.PORT || 8080);
