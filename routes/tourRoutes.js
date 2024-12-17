const fs = require('fs');
const express = require('express');
const router = express.Router();

// Get all the tours from json file
const tours = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8');
const toursObj = JSON.parse(tours);


const getAllTours = (request, response) => {
  response.status(200).json({
    message: "Data is available 👍",
    requestedAt: request.requestedTime,
    data: toursObj
  });
}

const getTourById = (request, response) => {
  const id = request.params.id * 1 // converting string to number
  const tour = toursObj.find(el => el.id === id);
  if (!tour) {
    response.status(404).send({
      status: "failure",
      message: "Tour not found!"
    })
  }
  else {
    response.status(200).send({
      status: "success",
      message: "Tour found!",
      data: {
        tour
      }
    })
  }
}

const addNewTour = (request, response) => {
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
}

const editTour = (request, response)=>{
  response.status(200).json(
    {
      status: "Success",
      message: `Patch request for id:${request.params.id} called successfully`
    }
  )
}

const deleteTour =  (request, response)=>{
  response.status(200).json(
    {
      status: "Success",
      message: `Delete request for id:${request.params.id} called successfully`
    }
  )
}

router.route('/').get(getAllTours).post(addNewTour)
router.route('/:id').get(getTourById).patch(editTour).delete(deleteTour)

module.exports = router;