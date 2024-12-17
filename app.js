PORT = '3000';
HOST_NAME = '127.0.0.1';

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// use middleware to read request body
app.use(express.json());
app.use(morgan('dev'));



// custom middlewares
app.use((request, response, next)=>{
  console.log('Hello from middleware 👋');
  next();
})

app.use((request, response, next)=>{
  request.requestedTime = new Date().toISOString();
  next();
})

// Get all the tours from json file
const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8');
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


const getAllUsers = (request, response)=>{
  response.status(500).json(
    {
      status: "ERROR",
      message: `This route is not available yet!`
    }
  )
}

const getUserById = (request, response)=>{
  response.status(500).json(
    {
      status: "ERROR",
      message: `This route is not available yet!`
    }
  )
}

const createNewUser = (request, response)=>{
  response.status(500).json(
    {
      status: "ERROR",
      message: `This route is not available yet!`
    }
  )
}

const editUser = (request, response)=>{
  response.status(500).json(
    {
      status: "ERROR",
      message: `This route is not available yet!`
    }
  )
}

const deleteUser = (request, response)=>{
  response.status(500).json(
    {
      status: "ERROR",
      message: `This route is not available yet!`
    }
  )
}

app.route('/api/v1/tours').get(getAllTours).post(addNewTour)
app.route('/api/v1/tours/:id').get(getTourById).patch(editTour).delete(deleteTour)

app.route('/api/v1/users').get(getAllUsers).post(createNewUser)
app.route('/api/v1/users/:id').get(getUserById).patch(editUser).delete(deleteUser)

app.listen(PORT, HOST_NAME, () => { console.log(`Server started at http://${HOST_NAME}:${PORT}`) });

