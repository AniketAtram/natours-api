PORT = '3000';
HOST_NAME = '127.0.0.1';

const express = require('express');
const morgan = require('morgan');

const app = express();

// routers
const usersRouter = require('./routes/userRoutes');
const toursRouter = require('./routes/tourRoutes');``

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

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.listen(PORT, HOST_NAME, () => { console.log(`Server started at http://${HOST_NAME}:${PORT}`) });

