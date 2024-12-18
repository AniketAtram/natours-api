const fs = require('fs');

// Get all the tours from json file
const tours = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8');
const toursObj = JSON.parse(tours);

// middleware to check if the id is valid
exports.chekIfIdIsValid = (request, response, next, value) => {
  const id = request.params.id * 1 // converting string to number
  if (toursObj.length - 1 < id) {
    return response.status(404).send({
      status: "failure",
      message: "Tour not found!"
    })
  }
  next();
}

exports.getAllTours = (request, response) => {
  response.status(200).json({
    message: "Data is available 👍",
    requestedAt: request.requestedTime,
    data: toursObj
  });
}

exports.getTourById = (request, response) => {
  const id = request.params.id * 1 // converting string to number
  const tour = toursObj.find(el => el.id === id);
  response.status(200).send({
    status: "success",
    message: "Tour found!",
    data: {
      tour
    }
  })
  // const id = request.params.id * 1 // converting string to number
  // const tour = toursObj.find(el => el.id === id);
  // if (!tour) {
  //   response.status(404).send({
  //     status: "failure",
  //     message: "Tour not found!"
  //   })
  // }
  // else {
  //   response.status(200).send({
  //     status: "success",
  //     message: "Tour found!",
  //     data: {
  //       tour
  //     }
  //   })
  // }
}

exports.addNewTour = (request, response) => {
  const newId = toursObj[toursObj.length - 1].id + 1 // create a new id
  const newTour = Object.assign({ id: newId }, request.body);
  toursObj.push(newTour);
  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.editTour = (request, response) => {
  response.status(200).json(
    {
      status: "Success",
      message: `Patch request for id:${request.params.id} called successfully`
    }
  )
}

exports.deleteTour = (request, response) => {
  response.status(200).json(
    {
      status: "Success",
      message: `Delete request for id:${request.params.id} called successfully`
    }
  )
}