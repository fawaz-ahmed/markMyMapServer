const express = require('express');
const bodyParser = require("body-parser");
const {
  getAllMarkers,
  saveMarker,
  updateMarker,
  deleteMarker,
} = require('./realm');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.port || 8000;

app.get('/', (req, res) => {
  res.send('I\'m Alive');
});

app.get('/markers', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getAllMarkers()));
});

app.post('/marker', (req, res, next) => {
  saveMarker(req.body).then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  }).catch(e => {
    next(e);
  });
});

app.put('/marker/:uuid', (req, res, next) => {
  updateMarker(req.params.uuid, req.body).then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  }).catch(e => {
    next(e);
  });
});

app.delete('/marker/:uuid', (req, res, next) => {
  deleteMarker(req.params.uuid).then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  }).catch(e => {
    next(e);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
