PORT = '3000';
HOST_NAME = '127.0.0.1';

const fs = require('fs');
const express = require('express');

const app = express();

// use middleware to read request body
app.use(express.json());

// Get all the tours from json file

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8');
const toursObj = JSON.parse(tours);

app.get('/api/v1/tours', (request, response) => {
  response.status(200).json({
    message: "Data is available 👍",
    data: toursObj
  });
})


app.post('/api/v1/tours', (request, response) => {
  const newId = toursObj[toursObj.length - 1].id + 1 // create a new id
  const newTour = Object.assign({ id: newId }, request.body);
  toursObj.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursObj),
    err => {
      response.status(201).send(
        {
          status: "success",
          data: {
            tour: newTour
          }
        }
      )
    })
})

app.listen(PORT, HOST_NAME, () => { console.log(`Server started at http://${HOST_NAME}:${PORT}`) });

