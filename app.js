const express = require('express');
const morgan = require('morgan');


const app = express();


// routers
const usersRouter = require('./routes/userRoutes');
const toursRouter = require('./routes/tourRoutes'); ``


// middlewares
app.use(express.json());
app.use(morgan('dev'));


// custom middlewares
app.use((request, response, next) => {
  console.log('Hello from middleware 👋');
  next();
})

app.use((request, response, next) => {
  request.requestedTime = new Date().toISOString();
  next();
})


app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);


module.exports = app;

