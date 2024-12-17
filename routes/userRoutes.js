const express = require('express');
const router = express.Router();

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

router.route('/').get(getAllUsers).post(createNewUser)
router.route('/:id').get(getUserById).patch(editUser).delete(deleteUser)

module.exports = router;