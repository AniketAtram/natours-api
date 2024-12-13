PORT = '3000';
HOST_NAME = '127.0.0.1';

const fs = require('fs');
const express = require('express');

const app = express();

// Get all the tours from json file

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8');
const toursObj = JSON.parse(tours);

app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
     message: "Data is available 👍", 
     data: toursObj });
})

app.listen(PORT, HOST_NAME, () => { console.log(`Server started at http://${HOST_NAME}:${PORT}`) });

