const express = require('express');
const bodyParser = require('body-parser');
const {
  getAllMarkers,
  saveMarker,
  updateMarker,
  deleteMarker,
} = require('./realm');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 8000;

// Test endpoint
app.get('/', (req, res) => {
  console.log('I\'m alive');
  res.send('I\'m Alive');
});

// Get a collection of all markers
app.get('/markers', (req, res) => {
  console.log('Get all markers req');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(getAllMarkers()));
});

// Create a marker
app.post('/marker', (req, res, next) => {
  console.log('Create marker req', req.body);
  saveMarker(req.body).then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  }).catch(e => {
    next(e);
  });
});

// Update a marker
app.put('/marker/:uuid', (req, res, next) => {
  console.log('Update marker req', req.params.uuid);
  updateMarker(req.params.uuid, req.body).then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  }).catch(e => {
    next(e);
  });
});

// Delete a marker
app.delete('/marker/:uuid', (req, res, next) => {
  console.log('Delete marker req', req.params.uuid);
  deleteMarker(req.params.uuid).then((response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  }).catch(e => {
    next(e);
  });
});

// Fire up server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
